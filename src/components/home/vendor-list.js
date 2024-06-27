import {
  Typography,
  Box,
  Button,
  TextField,
  InputAdornment,
  Stack,
  Tooltip,
  IconButton,
} from "@mui/material";
import { GridToolbarContainer, GridToolbarQuickFilter, useGridApiRef } from "@mui/x-data-grid-pro";
import {
  EmailOutlined as EmailIcon,
  DeleteOutline as DeleteIcon,
  Refresh,
} from "@mui/icons-material";
import { useFormik } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useCallback, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";

import { VendorService } from "src/services";
import { VendorsColumns } from "src/columns";
import { ClientDataGrid } from "../tables/client-datagrid";
const VendorDetailPanelContent = dynamic(() => import("./vendor-detail"), { ssr: false });
import LoadingOverlay from "../common/loading-overlay";
import { Modal } from "../common/modal";
import { ThankYou } from "./thank-you";
import { useAuth } from "src/hooks/use-auth";
import { currencyFormatter } from "src/utils";
import { FormsModal } from "./home-actions/forms-modal";
const PdfViewer = dynamic(() => import("../history/pdf-viewer"), { ssr: false });
const ManageCOI = dynamic(() => import("./home-actions/coi"), { ssr: false });
const InvoiceView = dynamic(() => import("./home-actions/invoice-view"), { ssr: false });
const InvoiceQuoteForm = dynamic(() => import("./invoice-quote-form"), { ssr: false });
const PaymentTypeForm = dynamic(() => import("./home-actions/payment-type-form"), { ssr: false });

const ReportRenderToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarQuickFilter debounceMs={200} />
    </GridToolbarContainer>
  );
};

const Footer = () => <></>;

export const VendorList = ({ isLoading, vendors }) => {
  const [gLoading, setGLoading] = useState(false);
  const [showCOI, setShowCOI] = useState(false);
  const [showInvoiceQuoteForm, setShowInvoiceQuoteForm] = useState(false);
  const [pdfUrl, setUrl] = useState("");
  const [vendorKey, setVendorKey] = useState("");
  const [myVendor, setMyVendor] = useState("");
  const [secondaryName, setSecondaryName] = useState("");
  const [showPDFModal, setShowPDFModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [canSendEmail, setCanSendEmail] = useState(false);
  const [showThankYou, setShowThankyou] = useState(false);
  const [subTitle, setSubTitle] = useState("");
  const [title, setTitle] = useState("");
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [curInvoice, setCurInvoice] = useState();
  const [showPaymentType, setShowPaymentType] = useState(false);
  const [showForms, setShowForms] = useState(false);

  const apiRef = useGridApiRef(null);

  const { showConfirmDlg, hideConfirm, project } = useAuth();

  const queryClient = useQueryClient();

  const getDetailPanelContent = useCallback(
    ({ row }) => <VendorDetailPanelContent row={row.vendor} />,
    [],
  );

  const handleInvoice = async (myVendor) => {
    setMyVendor(myVendor);
    setSecondaryName("Orders");
    if (myVendor.invoices.length > 0) {
      setShowInvoiceModal(true);
    } else {
      setCurInvoice(null);
      setShowInvoiceQuoteForm(true);
    }
  };

  const handlePaymentType = (row) => {
    setMyVendor(row);
    setShowPaymentType(true);
  };

  const formik = useFormik({
    enableReinitialize: true,
    onSubmit: async (values) => {
      setGLoading(true);
      try {
        await VendorService.sendEmail(myVendor.vendor.id, vendorKey, values.email, secondaryName);
        setShowThankyou(true);
      } catch (error) {
        toast.error(err.response?.data || err.message);
      } finally {
        setGLoading(false);
      }
    },
    initialValues: {
      email: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().email("Invalid email!").required("Required"),
    }),
  });

  const handleCOIStatus = async (coi_id, status) => {
    try {
      const {
        data: { detail },
      } = await VendorService.updateCOI(coi_id, { status });
      queryClient.invalidateQueries({ queryKey: ["getAllVendors", project?.id] });
      toast.success(detail);
    } catch (error) {
      toast.error(error.response?.data || err.message);
    } finally {
      setGLoading(false);
    }
  };

  const handleCOI = async (myVendor) => {
    setMyVendor(myVendor);
    setSecondaryName("COI");
    setTitle(`Upload COI for ${myVendor.vendor?.name}`);
    setShowCOI(true);
  };

  const handlePDF = async (name, key) => {
    setSecondaryName(name);
    setGLoading(true);
    try {
      const {
        data: { result },
      } = await VendorService.readPDF(key);
      setShowPDFModal(true);
      setUrl(result);
    } catch (err) {
      toast.error(err.response?.data || err.message);
    } finally {
      setGLoading(false);
    }
  };

  const handleGeneratePDF = async (myVendor, form) => {
    if (!project) {
      return toast.error("Please add a project.");
    }
    setSecondaryName(form.title);
    setMyVendor(myVendor);
    setGLoading(true);
    setCanSendEmail(true);
    try {
      const {
        data: {
          result: { presigned_url, key },
        },
      } = await VendorService.generateFormPDF(
        myVendor.vendor.id,
        project?.id,
        form.template_key,
        form.title,
      );
      setShowPDFModal(true);
      setUrl(presigned_url);
      setVendorKey(key);
    } catch (err) {
      toast.error(err.response?.data || err.message);
    } finally {
      setGLoading(false);
    }
  };

  const handleForms = async (myVendor) => {
    setMyVendor(myVendor);
    setShowForms(true);
  };

  const topCOIActions = useMemo(() => {
    const handleReplaceCOI = () => {
      setTitle(`Replace COI for ${myVendor.vendor.name}`);
      setShowCOI(true);
      setShowPDFModal(false);
    };

    const handleDeleteCOI = () => {
      showConfirmDlg({
        open: true,
        close: hideConfirm,
        callback: async () => {
          hideConfirm();
          try {
            setGLoading(true);
            const {
              data: { detail },
            } = await VendorService.deletePdf(myVendor.coi.key);
            queryClient.invalidateQueries({ queryKey: ["getAllVendors", project?.id] });

            setShowPDFModal(false);
            toast.success(detail);
          } catch (err) {
            toast.error(err.response?.data || err.message);
          } finally {
            setGLoading(false);
          }
        },
      });
    };

    return (
      <Stack direction="row" spacing={1}>
        <Tooltip title="Replace COI">
          <IconButton
            onClick={() => handleReplaceCOI()}
            size="small"
            color="info"
            edge="end"
            aria-label="COI"
          >
            <Refresh />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete COI">
          <IconButton
            onClick={() => handleDeleteCOI()}
            size="small"
            color="error"
            edge="end"
            aria-label="COI"
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    );
  }, [hideConfirm, queryClient, showConfirmDlg, myVendor]);

  const total = useMemo(() => {
    if (!vendors) return 0;
    return vendors
      .map(({ invoices }) => invoices.map(({ amount }) => amount))
      .flat()
      .reduce((a, c) => a + c, 0);
  }, [vendors]);

  const onRowClick = useCallback(
    (params) => {
      apiRef.current.toggleDetailPanel(params.id);
    },
    [apiRef],
  );

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 1 }}>
        <Typography variant="h6" mb={2}>
          My Vendors: &nbsp;(<small>{vendors?.length || "-"}</small>)
        </Typography>
        <Typography>
          <b>Total:</b> {currencyFormatter(total)}
        </Typography>
      </Box>
      <div style={{ height: 550, width: "100%" }}>
        <ClientDataGrid
          loading={isLoading}
          data={vendors || []}
          columns={VendorsColumns({
            handleForms,
            handleCOI,
            handleCOIStatus,
            handleInvoice,
            handlePaymentType,
            handlePDF,
            setMyVendor,
          })}
          getDetailPanelContent={getDetailPanelContent}
          rowSelectionModel={rowSelectionModel}
          setRowSelectionModel={setRowSelectionModel}
          toolbar={ReportRenderToolbar}
          onRowClick={onRowClick}
          slots={{
            footer: Footer,
          }}
          apiRef={apiRef}
        />
      </div>

      {/* Loading Overlay */}
      <LoadingOverlay setOpen={setGLoading} open={gLoading || isLoading} />
      {/* PDF Modal */}
      {showPDFModal && (
        <Modal
          title={`${myVendor.vendor?.name} - ${secondaryName || ""}`}
          subTitle={subTitle}
          open={true}
          onClose={() => setShowPDFModal(false)}
          size="md"
          topActions={secondaryName === "COI" ? topCOIActions : null}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <form onSubmit={formik.handleSubmit}>
              <Box
                sx={{
                  display: canSendEmail ? "flex" : "none",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: 2,
                  mb: 2,
                }}
              >
                <TextField
                  type="text"
                  size="small"
                  label="Email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  name="email"
                  error={!!formik.touched.email && !!formik.errors.email}
                  helperText={formik.touched.email && formik.errors.email}
                  sx={{ gridColumn: "span 2" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button type="submit" variant="contained">
                  Send
                </Button>
              </Box>
            </form>
          </Stack>
          <PdfViewer pdfUrl={pdfUrl} />
        </Modal>
      )}

      {/* Thank you modal */}
      {showThankYou && (
        <ThankYou
          open={true}
          onClose={() => setShowThankyou(false)}
          text={
            <Typography variant="body1" mb={1} textAlign="center">
              Form will be sent to <b>{formik.values.email}</b> &nbsp;
            </Typography>
          }
        />
      )}

      {/* COI Modal */}
      {showCOI && <ManageCOI title={title} myVendor={myVendor} open={true} setOpen={setShowCOI} />}

      {/* Manage Invoice Modal */}
      {showInvoiceQuoteForm && (
        <InvoiceQuoteForm
          show={true}
          myVendor={myVendor}
          setMyVendor={setMyVendor}
          onClose={() => {
            setShowInvoiceQuoteForm(false);
            setCurInvoice(null);
          }}
          onModalClose={() => setShowInvoiceModal(false)}
          invoice={curInvoice}
        />
      )}

      {/* Show Invoice Modal */}
      {showInvoiceModal && (
        <InvoiceView
          open={true}
          onClose={() => setShowInvoiceModal(false)}
          myVendor={myVendor}
          setMyVendor={setMyVendor}
          setShowPDFModal={setShowPDFModal}
          setSecondaryName={setSecondaryName}
          setShowInvoiceQuoteForm={setShowInvoiceQuoteForm}
          curInvoice={curInvoice}
          setCurInvoice={setCurInvoice}
          setUrl={setUrl}
          setGLoading={setGLoading}
          setSubTitle={setSubTitle}
        />
      )}

      {/* Payment Type */}
      {showPaymentType && (
        <PaymentTypeForm
          show={true}
          onClose={() => setShowPaymentType(false)}
          myVendor={myVendor}
        />
      )}

      {/* Forms */}
      {showForms && (
        <FormsModal
          myVendor={myVendor}
          open={showForms}
          onClose={() => setShowForms(false)}
          handleGeneratePDF={handleGeneratePDF}
          handlePDF={handlePDF}
        />
      )}
    </>
  );
};

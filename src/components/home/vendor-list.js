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
  Download,
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
const PdfViewer = dynamic(() => import("../history/pdf-viewer"), { ssr: false });
import { ThankYou } from "./thank-you";
const ManageCOI = dynamic(() => import("./home-actions/coi"), { ssr: false });
const ManageInvoice = dynamic(() => import("./home-actions/invoice"), { ssr: false });
const InvoiceView = dynamic(() => import("./home-actions/invoice-view"), { ssr: false });
import { useAuth } from "src/hooks/use-auth";
import { downloadMedia } from "src/utils";

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
  const [showInvoice, setShowInvoice] = useState(false);
  const [pdfUrl, setUrl] = useState("");
  const [vendorKey, setVendorKey] = useState("");
  const [myVendor, setMyVendor] = useState("");
  const [invoice, setInvoice] = useState("");
  const [showPDFModal, setShowPDFModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [canSendEmail, setCanSendEmail] = useState(false);
  const [showThankYou, setShowThankyou] = useState(false);
  const [subTitle, setSubTitle] = useState("");
  const [title, setTitle] = useState("");
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  const apiRef = useGridApiRef(null);

  const { showConfirmDlg, hideConfirm, project } = useAuth();

  const queryClient = useQueryClient();

  const getDetailPanelContent = useCallback(
    ({ row }) => <VendorDetailPanelContent row={row.vendor} />,
    [],
  );

  const handleGeneratePDF = async (myVendor, form) => {
    if (!project) {
      return toast.error("Please add a project.");
    }
    setInvoice(form.title);
    setMyVendor(myVendor);
    setGLoading(true);
    setCanSendEmail(true);
    try {
      const {
        data: {
          result: { presigned_url, key },
        },
      } = await VendorService.generateFormPDF(myVendor.vendor.id, project?.id, form.template_key, form.title);
      setShowPDFModal(true);
      setUrl(presigned_url);
      setVendorKey(key);
    } catch (err) {
      toast.error(err.response?.data || err.message);
    } finally {
      setGLoading(false);
    }
  };

  const handleW9 = async (myVendor) => {
    setInvoice("W9");
    setMyVendor(myVendor);
    setGLoading(true);
    try {
      const {
        data: { result },
      } = await VendorService.readW9(myVendor.vendor.id, project?.id);
      setShowPDFModal(true);
      setUrl(result);
    } catch (err) {
      toast.error(err.response?.data || err.message);
    } finally {
      setGLoading(false);
    }
  };

  const handleInvoice = async (myVendor, invoices) => {
    setMyVendor(myVendor);
    setInvoice("Invoices");
    if (invoices.length > 0) {
      try {
        await VendorService.readInvoices(myVendor.id);
        setShowInvoiceModal(true);
      } catch (error) {
        toast.error(err.response?.data || err.message);
      } finally {
        setGLoading(false);
      }
    } else {
      setShowInvoice(true);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    onSubmit: async (values) => {
      setGLoading(true);
      try {
        await VendorService.sendEmail(myVendor.vendor.id, vendorKey, values.email, invoice);
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

  const handleCOI = async (myVendor) => {
    setMyVendor(myVendor);
    setInvoice("COI");
    if (myVendor.coi) {
      try {
        const {
          data: { result },
        } = await VendorService.readPDF(myVendor.coi);
        setShowPDFModal(true);
        setUrl(result);
      } catch (error) {
        toast.error(err.response?.data || err.message);
      } finally {
        setGLoading(false);
      }
    } else {
      setTitle(`Upload COI for ${myVendor.vendor?.name}`);
      setShowCOI(true);
    }
  };

  const invoices = useMemo(() => {
    return myVendor.invoices;
  }, [myVendor]);

  const topActions = useMemo(() => {
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
            const {
              data: { detail },
            } = await VendorService.deleteCOI(myVendor.id);
            queryClient.invalidateQueries({ queryKey: ["getAllVendors", project?.id] });

            setShowPDFModal(false);
            toast.success(detail);
          } catch (err) {
            toast.error(err.response?.data || err.message);
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
      .map(({ invoices }) => invoices.map(({ total }) => total))
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
          <b>Total:</b> ${total}
        </Typography>
      </Box>
      <div style={{ height: 550, width: "100%" }}>
        <ClientDataGrid
          loading={isLoading}
          data={vendors || []}
          columns={VendorsColumns({ handleGeneratePDF, handleW9, handleCOI, handleInvoice })}
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
          title={`${myVendor.vendor?.name} - ${invoice || ""}`}
          subTitle={subTitle}
          open={true}
          onClose={() => setShowPDFModal(false)}
          size="md"
          topActions={invoice === "COI" ? topActions : null}
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
            <Tooltip title="Download PDF">
              <IconButton
                color="primary"
                variant="contained"
                onClick={() => downloadMedia(`${myVendor.vendor?.name} - ${invoice || ""}`, pdfUrl)}
              >
                <Download />
              </IconButton>
            </Tooltip>
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
      {showInvoice && (
        <ManageInvoice
          title={`Upload Invoices for ${myVendor.vendor?.name}`}
          myVendor={myVendor}
          maxFileLimit={10 - (myVendor.invoices?.length || 0)}
          open={true}
          onClose={() => setShowInvoice(false)}
        />
      )}

      {/* Show Invoice Modal */}
      {showInvoiceModal && (
        <InvoiceView
          open={true}
          onClose={() => setShowInvoiceModal(false)}
          myVendor={myVendor}
          invoices={invoices}
          setShowPDFModal={setShowPDFModal}
          setInvoice={setInvoice}
          setUrl={setUrl}
          setGLoading={setGLoading}
          showInvoice={showInvoice}
          setShowInvoice={setShowInvoice}
          setSubTitle={setSubTitle}
        />
      )}
    </>
  );
};

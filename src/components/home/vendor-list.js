import {
  Typography,
  Box,
  Button,
  TextField,
  InputAdornment,
  CircularProgress,
  Stack,
  Tooltip,
  IconButton,
} from "@mui/material";
import { GridToolbarContainer, GridToolbarQuickFilter } from "@mui/x-data-grid-pro";
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

import { VendorService } from "src/services";
import { VendorsColumns } from "src/columns";
import { ClientDataGrid } from "../tables/client-datagrid";
import { VendorDetailPanelContent } from "./vendor-detail";
import LoadingOverlay from "../common/loading-overlay";
import { Modal } from "../common/modal";
import { PdfViewer } from "../history/pdf-viewer";
import { ThankYou } from "./thank-you";
import { ManageCOI } from "./home-actions/coi";
import { ManageInvoice } from "./home-actions/invoice";
import { InvoiceView } from "./home-actions/invoice-view";
import { useAuth } from "src/hooks/use-auth";
import { downloadMedia } from "src/utils";

const ReportRenderToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
};

const Footer = () => <></>;

export const VendorList = ({ setRowSelectionModel, rowSelectionModel, isLoading, vendors }) => {
  const [gLoading, setGLoading] = useState(false);
  const [showCOI, setShowCOI] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [pdfUrl, setUrl] = useState("");
  const [vendorKey, setVendorKey] = useState("");
  const [vendor, setVendor] = useState("");
  const [invoice, setInvoice] = useState("");
  const [showPDFModal, setShowPDFModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [canSendEmail, setCanSendEmail] = useState(false);
  const [showThankYou, setShowThankyou] = useState(false);
  const [subTitle, setSubTitle] = useState("");
  const [title, setTitle] = useState("");

  const { showConfirmDlg, hideConfirm, project } = useAuth();

  const queryClient = useQueryClient();

  const getDetailPanelContent = useCallback(
    ({ row }) => <VendorDetailPanelContent row={row.vendor} />,
    [],
  );

  const handleGeneratePDF = async (vendor, form) => {
    if (!project) {
      return toast.error("Please add a project.");
    }
    setInvoice(form.title);
    setVendor(vendor);
    setGLoading(true);
    setCanSendEmail(true);
    try {
      const {
        data: {
          result: { presigned_url, key },
        },
      } = await VendorService.generateFormPDF(vendor.id, project?.id, form.template_key);
      setShowPDFModal(true);
      setUrl(presigned_url);
      setVendorKey(key);
    } catch (error) {
      console.log("handleGeneratePDF", error);
    } finally {
      setGLoading(false);
    }
  };

  const handleW9 = async (vendor) => {
    setInvoice("W9");
    setVendor(vendor);
    setGLoading(true);
    try {
      const {
        data: { result },
      } = await VendorService.readW9(vendor.id);
      setShowPDFModal(true);
      setUrl(result);
    } catch (error) {
      console.log("handleW9", error);
    } finally {
      setGLoading(false);
    }
  };

  const handleInvoice = async (vendor) => {
    setVendor(vendor);
    setInvoice("Invoices");
    if (vendor.invoices.length > 0) {
      try {
        const {
          data: { result },
        } = await VendorService.readInvoices(vendor.id);
        setShowInvoiceModal(true);
        setInvoices(result);
      } catch (error) {
        console.log("handleCOI", error);
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
        await VendorService.sendEmail(vendor.id, vendorKey, values.email, invoice);
        setShowThankyou(true);
      } catch (error) {
        toast.error(error.message || error.response?.message);
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

  const handleCOI = async (vendor) => {
    setVendor(vendor);
    setInvoice("COI");
    if (vendor.coi) {
      try {
        const {
          data: { result },
        } = await VendorService.readPDF(vendor.coi);
        setShowPDFModal(true);
        setUrl(result);
      } catch (error) {
        console.log("handleCOI", error);
      } finally {
        setGLoading(false);
      }
    } else {
      setTitle(`Upload COI for ${vendor?.name}`);
      setShowCOI(true);
    }
  };

  const handleReplaceCOI = () => {
    setTitle(`Replace COI for ${vendor.name}`);
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
          } = await VendorService.deleteCOI(vendor.id);
          queryClient.invalidateQueries({ queryKey: ["getAllVendors"] });

          // setVendors((prev) => ({
          //   ...prev,
          //   items: [
          //     ...prev.items.filter((p) => p.id !== vendor.id),
          //     ...prev.items
          //       .filter((p) => p.id === vendor.id)
          //       .map((p) => {
          //         const { coi, ...rest } = p;
          //         return { ...rest };
          //       }),
          //   ],
          // }));
          setShowPDFModal(false);
          toast.success(detail);
        } catch (err) {
          toast.error(err?.response?.message);
        }
      },
    });
  };

  const topActions = useMemo(() => {
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
  }, [handleDeleteCOI, handleReplaceCOI, invoice]);

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="h6" mb={2}>
          My Vendors: &nbsp;(<small>{vendors?.length || "-"}</small>)
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
          slots={{
            footer: Footer,
          }}
        />
      </div>

      {/* Loading Overlay */}
      <LoadingOverlay setOpen={setGLoading} open={gLoading || isLoading} />

      {/* PDF Modal */}
      <Modal
        title={`${vendor?.name} - ${invoice || ""}`}
        subTitle={subTitle}
        open={showPDFModal}
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
              onClick={() => downloadMedia(`${vendor?.name} - ${invoice || ""}`, pdfUrl)}
            >
              <Download />
            </IconButton>
          </Tooltip>
        </Stack>
        <PdfViewer pdfUrl={pdfUrl} />
      </Modal>

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
      {showCOI && <ManageCOI title={title} vendor={vendor} open={true} setOpen={setShowCOI} />}

      {/* Manage Invoice Modal */}
      {showInvoice && (
        <ManageInvoice
          title={`Upload Invoices for ${vendor.name}`}
          vendor={vendor}
          maxFileLimit={10 - vendor.invoices.length}
          open={true}
          setOpen={setShowInvoice}
        />
      )}

      {/* Show Invoice Modal */}
      {showInvoiceModal && (
        <InvoiceView
          open={true}
          onClose={() => setShowInvoiceModal(false)}
          vendor={vendor}
          invoices={invoices}
          setInvoices={setInvoices}
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

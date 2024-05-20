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
} from "@mui/icons-material";
import { useFormik } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useCallback, useEffect, useMemo, useState } from "react";

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

const ReportRenderToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
};

const Footer = () => <></>;

export const VendorList = ({ setRowSelectionModel, rowSelectionModel, vendors, setVendors }) => {
  const [loading, setLoading] = useState(false);
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

  const { showConfirmDlg, hideConfirm } = useAuth();

  const getDetailPanelContent = useCallback(
    ({ row }) => <VendorDetailPanelContent row={row} />,
    []
  );

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await VendorService.all();
      setVendors(data.result);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getData();
  }, []);

  const handleGeneratePDF = async (vendor, invoice) => {
    setInvoice(invoice);
    setVendor(vendor);
    setGLoading(true);
    setCanSendEmail(true);
    try {
      const {
        data: {
          result: { presigned_url, key },
        },
      } = await VendorService.generateOnePDF(vendor.id, invoice);
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

  const handleCOI = async (vendor) => {
    setVendor(vendor);
    setInvoice("COI");
    if (vendor.coi) {
      try {
        const {
          data: { result },
        } = await VendorService.readCOI(vendor.coi);
        setShowPDFModal(true);
        setUrl(result);
      } catch (error) {
        console.log("handleCOI", error);
      } finally {
        setGLoading(false);
      }
    } else {
      setShowCOI(true);
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

  const handleReplaceCOI = () => {};

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
          setVendors((prev) => ({
            ...prev,
            items: [
              ...prev.items.filter((p) => p.id !== vendor.id),
              ...prev.items
                .filter((p) => p.id === vendor.id)
                .map((p) => {
                  const { coi, ...rest } = p;
                  return { ...rest };
                }),
            ],
          }));
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
  }, [
    handleDeleteCOI,
    handleReplaceCOI,
    vendors,
    vendor,
    showConfirmDlg,
    hideConfirm,
    showPDFModal,
  ]);

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="h6" mb={2}>
          Vendors: &nbsp;(<small>{vendors?.items?.length || "-"}</small>)
        </Typography>
      </Box>
      <div style={{ height: 550, width: "100%" }}>
        <ClientDataGrid
          loading={loading}
          data={vendors?.items || []}
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
      <LoadingOverlay setOpen={setGLoading} open={gLoading} />
      <Modal
        title={`${vendor?.name} - ${invoice || ""}`}
        subTitle={subTitle}
        open={showPDFModal}
        onClose={() => setShowPDFModal(false)}
        size="md"
        topActions={topActions}
      >
        <form onSubmit={formik.handleSubmit}>
          <Box
            sx={{
              display: canSendEmail ? "flex" : "none",
              flexWrap: "wrap",
              alignItems: "flex-start",
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
            <Button
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
              type="submit"
              variant="contained"
            >
              Send Email
            </Button>
          </Box>
        </form>
        <PdfViewer pdfUrl={pdfUrl} />
      </Modal>
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
      {showCOI && (
        <ManageCOI vendor={vendor} open={true} setOpen={setShowCOI} refreshData={getData} />
      )}
      {showInvoice && (
        <ManageInvoice
          title={`Upload Invoices for ${vendor.name}`}
          vendor={vendor}
          maxFileLimit={10 - vendor.invoices.length}
          open={true}
          setOpen={setShowInvoice}
          refreshData={getData}
        />
      )}
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
          getData={getData}
          setSubTitle={setSubTitle}
        />
      )}
    </>
  );
};

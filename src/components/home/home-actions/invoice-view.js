import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import {
  AttachMoney,
  Edit,
  DeleteOutline as DeleteIcon,
  Refresh,
  UploadFile,
  DocumentScanner as ViewIcon,
} from "@mui/icons-material";
import { useState } from "react";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as yup from "yup";
import { useQueryClient } from "@tanstack/react-query";

import { Modal } from "src/components/common/modal";
import { VendorService } from "src/services";
import { ManageInvoice } from "./invoice";
import { currencyFormatter, sum } from "src/utils";
import { useAuth } from "src/hooks/use-auth";

export const InvoiceView = ({
  vendor,
  invoices,
  setInvoices,
  open,
  onClose,
  setShowPDFModal,
  setInvoice,
  setUrl,
  setGLoading,
  showInvoice,
  setShowInvoice,
  setSubTitle,
}) => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [loading, setLoading] = useState(false);
  const [curInvoice, setCurInvoice] = useState();
  const [uploadTitle, setUploadTitle] = useState({
    title: `Upload Invoices for ${vendor?.name}`,
    subTitle: '',
  });
  const [maxFileLimit, setMaxFileLimit] = useState(10 - vendor.invoices.length);

  const queryClient = useQueryClient();

  const { showConfirmDlg, hideConfirm } = useAuth();

  const handleView = async (id, key, total) => {
    if (!total) {
      setCurInvoice({ id, total });
      return setShowPrompt(true);
    }

    setInvoice(`${key.split("/").at(-1)}`);
    setSubTitle(currencyFormatter(total));
    try {
      const {
        data: { result },
      } = await VendorService.readPDF(key);
      setShowPDFModal(true);
      setUrl(result);
    } catch (error) {
      console.log("handleCOI", error);
    } finally {
      setGLoading(false);
    }
  };

  const handleMore = () => {
    setShowInvoice(true);
  };

  const formik = useFormik({
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const {
          data: { detail },
        } = await VendorService.addTotal2Invoice(curInvoice.id, values.total);
        handleClose();
        toast.success(detail);
        setInvoices((prev) =>
          prev.map((invoice) => {
            if (invoice.id === curInvoice.id)
              return {
                ...invoice,
                total: values.total,
              };
            return invoice;
          })
        );
        queryClient.invalidateQueries({ queryKey: ["getAllVendors"] });
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    },
    initialValues: {
      total: 0,
    },
    validationSchema: yup.object().shape({
      total: yup.number().required("Required"),
    }),
  });

  const handleClose = () => {
    formik.resetForm();
    setShowPrompt(false);
  };

  const handleEdit = (id, total) => {
    formik.setFieldValue("total", total);
    setCurInvoice({ id, total });
    setShowPrompt(true);
  };

  const handleDelete = (id) => {
    showConfirmDlg({
      open: true,
      close: hideConfirm,
      callback: async () => {
        hideConfirm();
        try {
          const {
            data: { detail },
          } = await VendorService.deleteInvoice(id);
          toast.success(detail);
          setInvoices((prev) => prev.filter((invoice) => invoice.id !== id));
          queryClient.invalidateQueries({ queryKey: ["getAllVendors"] });
        } catch (err) {
          toast.error(err?.response?.message);
        }
      },
    });
  };

  const handleReplace = async (id, total) => {
    setUploadTitle({
      title: `Replace Invoice for ${vendor.name}`,
      subTitle: "Invoice amount will remain same after replaced.",
    });
    setCurInvoice({ id, total });
    setMaxFileLimit(1);
    setShowInvoice(true);
  };

  const replaceInvoice = async (newInvoice) => {
    try {
      await VendorService.deleteInvoice(curInvoice.id);
      if (curInvoice.total) {
        await VendorService.addTotal2Invoice(curInvoice.id, curInvoice.total);
      }
      setInvoices((prev) =>
        prev.map((invoice) => {
          if (invoice.id === curInvoice.id)
            return {
              ...newInvoice,
              total: curInvoice.total,
            };
          return invoice;
        })
      );
    } catch (err) {
      toast.error(err?.message || err?.response?.message);
    }
  };

  return (
    <>
      <Modal
        title={`${vendor?.name} - Invoices (${invoices.length})`}
        subTitle={currencyFormatter(sum(invoices.map((i) => i.total).filter(v => v)))}
        open={open}
        onClose={onClose}
        size="md"
      >
        <List sx={{ width: 1 }}>
          {invoices.map(({ id, key, total }) => (
            <ListItem
              key={key}
              secondaryAction={
                <Stack direction="row" spacing={1}>
                  {total && (
                    <Tooltip title="Edit Total">
                      <IconButton
                        onClick={() => handleEdit(id, total)}
                        size="small"
                        color="secondary"
                        edge="end"
                        aria-label="comments"
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                  )}

                  <Tooltip title="Replace Invoice">
                    <IconButton
                      onClick={() => handleReplace(id, total)}
                      size="small"
                      color="info"
                      edge="end"
                      aria-label="comments"
                    >
                      <Refresh />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Invoice">
                    <IconButton
                      onClick={() => handleDelete(id)}
                      size="small"
                      color="error"
                      edge="end"
                      aria-label="comments"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
              }
              disablePadding
            >
              <ListItemButton key={id} onClick={() => handleView(id, key, total)}>
                <ListItemAvatar>
                  <ViewIcon color="warning" fontSize="large" />
                </ListItemAvatar>
                <ListItemText
                  primary={key.split("/").at(-1)}
                  secondary={`${currencyFormatter(total)}`}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {invoices.length < 10 && (
          <Button onClick={handleMore} variant="outlined" startIcon={<UploadFile />} sx={{ mt: 2 }}>
            Upload More Invoices
          </Button>
        )}
      </Modal>
      {showInvoice && (
        <ManageInvoice
          maxFileLimit={maxFileLimit}
          title={uploadTitle.title}
          subTitle={uploadTitle.subTitle}
          vendor={vendor}
          open={true}
          setOpen={setShowInvoice}
          replaceInvoice={replaceInvoice}
        />
      )}
      {showPrompt && (
        <Modal noFullWidth title="Input Total Price" open={true} onClose={handleClose} size="xs">
          <form onSubmit={formik.handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 2,
              }}
            >
              <TextField
                type="number"
                size="small"
                label="Total"
                autoFocus
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.total}
                name="total"
                error={!!formik.touched.total && !!formik.errors.total}
                helperText={formik.touched.total && formik.errors.total}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoney />
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
                Save
              </Button>
            </Box>
          </form>
        </Modal>
      )}
    </>
  );
};

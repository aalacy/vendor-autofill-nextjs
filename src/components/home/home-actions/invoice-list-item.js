import {
  Box,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Edit,
  DeleteOutline as DeleteIcon,
  Refresh,
  DocumentScanner as ViewIcon,
  AttachMoneyOutlined,
} from "@mui/icons-material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

import { VendorService } from "src/services";
import { useAuth } from "src/hooks/use-auth";
import { beautyDate, currencyFormatter } from "src/utils";
import { useState } from "react";

export const InvoiceListItem = ({
  subheader,
  items,
  setUploadTitle,
  setMaxFileLimit,
  setShowPDFModal,
  setSecondaryName,
  setUrl,
  setGLoading,
  setSubTitle,
  setCurInvoice,
  onClose,
  showEditForm,
  myVendor,
  setShowReplace
}) => {
  const { showConfirmDlg, hideConfirm, project } = useAuth();

  const [open, setOpen] = useState({});

  const queryClient = useQueryClient();

  const handleView = async (invoice) => {
    setSecondaryName(`${invoice.key.split("/").at(-1)}`);
    setSubTitle(currencyFormatter(invoice.amount));
    try {
      const {
        data: { result },
      } = await VendorService.readPDF(invoice.key);
      setShowPDFModal(true);
      setUrl(result);
    } catch (error) {
      console.log("handleView", error);
    } finally {
      setGLoading(false);
    }
  };

  const handleEdit = (invoice) => {
    setCurInvoice(invoice);
    showEditForm();
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
          onClose();
          queryClient.invalidateQueries({ queryKey: ["getAllVendors", project?.id] });
        } catch (err) {
          toast.error(err.response?.data || err.message);
        }
      },
    });
  };

  const handleReplace = async (invoice) => {
    setUploadTitle({
      title: `Replace Invoice, Quote for ${myVendor.vendor.name}`,
      subTitle: "The amount will remain same after replaced.",
    });
    setCurInvoice(invoice);
    setMaxFileLimit(1);
    setShowReplace(true);
  };

  const handleSummary = (invoice) =>
    setOpen((prev) => ({ ...prev, [invoice.id]: !prev[invoice.id] }));

  return (
    <List
      sx={{ width: 1 }}
      subheader={
        <Typography fontWeight="500" sx={{ mb: 2 }}>
          {subheader}
        </Typography>
      }
    >
      {items.map((invoice) => (
        <>
          <ListItem
            key={invoice.id}
            secondaryAction={
              <Stack alignItems="flex-end">
                <Typography
                  variant="subtitle2"
                  sx={{ mr: 1 }}
                >{`${currencyFormatter(invoice.amount)}`}</Typography>
                <Stack direction="row" spacing={1}>
                  {invoice.amount && (
                    <Tooltip title="Edit Order">
                      <IconButton
                        onClick={() => handleEdit(invoice)}
                        size="small"
                        color="secondary"
                        edge="end"
                        aria-label="comments"
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                  )}

                  <Tooltip title="Replace Order">
                    <IconButton
                      onClick={() => handleReplace(invoice)}
                      size="small"
                      color="info"
                      edge="end"
                      aria-label="comments"
                    >
                      <Refresh />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Order">
                    <IconButton
                      onClick={() => handleDelete(invoice.id)}
                      size="small"
                      color="error"
                      edge="end"
                      aria-label="comments"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="More">
                    <IconButton onClick={() => handleSummary(invoice)}>
                      {open[invoice.id] ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Stack>
            }
            disablePadding
            sx={{ bgcolor: "background.paper", mb: 1, borderRadius: 2 }}
          >
            <ListItemButton
              key={invoice.id}
              onClick={() => handleView(invoice)}
              disabled={!!!invoice.key}
            >
              <ListItemAvatar>
                <Stack alignItems="flex-end" direction="row">
                  <ViewIcon color="warning" fontSize="large" />
                  {invoice.paid_invoice && (
                    <AttachMoneyOutlined titleAccess="Paid Invoice" fontSize="small" />
                  )}
                </Stack>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Stack
                    direction="row"
                    useFlexGap
                    flexWrap="wrap"
                    spacing={1}
                    divider={<Divider orientation="vertical" flexItem light />}
                    mr={9}
                    mb={1}
                  >
                    <Typography
                      fontWeight="500"
                      title={invoice.key.split("/").at(-1)}
                      noWrap
                      sx={{ flex: 1 }}
                    >
                      {invoice.key.split("/").at(-1)}
                    </Typography>
                    <Typography variant="overline">order {invoice.order_number}</Typography>
                  </Stack>
                }
                secondary={
                  <Stack
                    direction="row"
                    spacing={1}
                    divider={<Divider orientation="vertical" light flexItem />}
                    mr={9}
                  >
                    <Typography variant="subtitle2">
                      Received: {beautyDate(invoice.received_date)}
                    </Typography>
                    <Typography variant="subtitle2">Due: {beautyDate(invoice.due_date)}</Typography>
                  </Stack>
                }
              />
            </ListItemButton>
          </ListItem>
          <Collapse in={open[invoice.id]} timeout="auto" unmountOnExit>
            <Paper sx={{ ml: "auto", p: 1, width: 2 / 3, mb: 1 }}>
              <List
                component="div"
                disablePadding
                subheader={
                  <Typography variant="subtitle2" color="GrayText" fontWeight="500">
                    Summary
                  </Typography>
                }
              >
                <Typography sx={{ ml: 1, whiteSpace: "pre" }}>{invoice.order_summary}</Typography>
              </List>
            </Paper>
          </Collapse>
        </>
      ))}
    </List>
  );
};

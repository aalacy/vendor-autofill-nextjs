import {
  IconButton,
  Tooltip,
  Typography,
  Stack,
  Avatar,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
} from "@mui/material";
import {
  AddCircleOutline as AddIcon,
  VerifiedOutlined as W9Icon,
  UploadOutlined,
} from "@mui/icons-material";

import { currencyFormatter, sum } from "src/utils";
import { useCallback, useMemo, useState } from "react";
import { COI_STATUS, COI_STATUS_ICONS } from "src/utils/constants";

const FormCell = (params) => {
  const { row, handleForms } = params;
  return (
    <Tooltip title="Show Forms">
      <span>
        <IconButton
          color="info"
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            handleForms(row);
          }}
        >
          <Avatar sx={{ width: 24, height: 24, bgcolor: "success.main" }}>
            {row.vendor.forms.length}
          </Avatar>
        </IconButton>
      </span>
    </Tooltip>
    // <Stack direction="row" justifyContent="center" spacing={1}>
    //   {row.vendor.forms?.map((form) => (
    //     <Tooltip key={form.name} title={form.title}>
    //       <span>
    //         <IconButton
    //           color="info"
    //           size="small"
    //           onClick={(e) => {
    //             e.stopPropagation();
    //             handleGeneratePDF(row, form);
    //           }}
    //         >
    //           <ViewIcon />
    //         </IconButton>
    //       </span>
    //     </Tooltip>
    //   ))}
    // </Stack>
  );
};

const W9Cell = (params) => {
  const { row, handleW9 } = params;

  return (
    <Tooltip title={row.vendor.w9 ? "Show" : "Empty"}>
      <span>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            handleW9(row);
          }}
          disabled={!!!row.vendor.w9}
        >
          <W9Icon color={row.vendor.w9 ? "primary" : "inherit"} />
        </IconButton>
      </span>
    </Tooltip>
  );
};

const COICell = (params) => {
  const { value, row, handleCOI, handleCOIStatus } = params;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeCOIStatus = (coi, status) => {
    handleClose();
    if (coi && coi.status !== status) handleCOIStatus(coi.id, status);
  };

  return (
    <>
      <Tooltip title={value?.status}>
        <span>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              // handleCOI(row);
              handleClick(e);
            }}
            id="coi-button"
            aria-controls={open ? "coi-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            size="small"
          >
            {COI_STATUS_ICONS[value?.status]}
          </IconButton>
        </span>
      </Tooltip>
      <Menu
        id="coi-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "coi-button",
        }}
      >
        <MenuItem onClick={() => handleCOI(row)} sx={{ textTransform: "uppercase" }}>
          <ListItemIcon>
            <UploadOutlined color="primary" />
          </ListItemIcon>
          <ListItemText>Upload</ListItemText>
        </MenuItem>
        <Divider />
        {COI_STATUS.map(({ label, value, icon }) => (
          <MenuItem
            key={value}
            onClick={() => changeCOIStatus(row.coi, value)}
            sx={{ textTransform: "uppercase" }}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText>{label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

const OrderCell = (params) => {
  const { value, row, handleInvoice, handlePaymentType } = params;

  const filteredCount = useCallback(
    (order_type = "Invoice") => {
      return row.invoices.filter((invoice) => invoice.order_type === order_type).length;
    },
    [row],
  );

  const amount = useMemo(() => {
    return sum(row.invoices.map(({ amount }) => amount));
  }, [row]);

  return (
    <Button
      onClick={(e) => {
        e.stopPropagation();
        handleInvoice(row);
      }}
      fullWidth
    >
      {value?.length < 1 ? (
        <Box width={1}>
          <AddIcon color="primary" />
        </Box>
      ) : (
        <Stack direction="row" spacing={1} width={1}>
          <Stack direction="column" alignItems="center" spacing={2}>
            <Tooltip title="Invoices">
              <Avatar sx={{ width: 24, height: 24, bgcolor: "success.main" }}>
                {filteredCount()}
              </Avatar>
            </Tooltip>
            <Tooltip title="Quotes & Placeholders">
              <Avatar sx={{ width: 24, height: 24, bgcolor: "warning.main" }}>
                {filteredCount("Quote") + filteredCount("Placeholder")}
              </Avatar>
            </Tooltip>
          </Stack>
          <Stack
            width={1}
            direction="column"
            alignItems="center"
            spacing={2}
            justifyContent="center"
          >
            <Tooltip title="Payment Type">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePaymentType(row);
                }}
                size="small"
                sx={{ p: 0, textTransform: "uppercase", whiteSpace: "nowrap" }}
              >
                {row.payment_type || "Payment Type"}
              </Button>
            </Tooltip>

            <Tooltip title="Total Amount">
              <Typography width={1} color="GrayText">
                {currencyFormatter(amount)}
              </Typography>
            </Tooltip>
          </Stack>
        </Stack>
      )}
    </Button>
  );
};

export const VendorsColumns = ({
  handleForms,
  handleCOI,
  handleCOIStatus,
  handleInvoice,
  handlePaymentType,
}) => {
  return [
    {
      field: "vendor_name",
      headerName: "Vendor Name",
      type: "string",
      resizable: true,
      valueGetter: (params) => params.row.vendor.name,
      width: 200,
    },
    {
      field: "coi",
      headerName: "COI",
      type: "string",
      resizable: true,
      align: "center",
      headerAlign: "center",
      width: 100,
      renderCell: (params) => (
        <COICell {...params} handleCOI={handleCOI} handleCOIStatus={handleCOIStatus} />
      ),
    },
    {
      field: "invoices",
      headerName: "Orders",
      type: "string",
      headerAlign: "center",
      resizable: true,
      width: 200,
      renderCell: (params) => (
        <OrderCell
          {...params}
          handleInvoice={handleInvoice}
          handlePaymentType={handlePaymentType}
        />
      ),
    },
    {
      field: "vendor_forms",
      headerName: "Forms",
      type: "string",
      headerAlign: "center",
      align: "center",
      resizable: true,
      width: 100,
      renderCell: (params) => <FormCell {...params} handleForms={handleForms} />,
    },

    // {
    //   field: "credit_auth",
    //   headerName: "Credit Auth",
    //   resizable: true,
    //   renderCell: (params) => <EditSwitchCell  {...params}  field="credit_auth" handleCellValueChange={handleCellValueChange}/>
    // },
    // {
    //   field: "rental_agreement",
    //   headerName: "Rental Agreement",
    //   resizable: true,
    //   width: 300,
    //   renderCell: (params) => <EditSwitchCell  {...params} field="rental_agreement" handleCellValueChange={handleCellValueChange}/>
    // },
  ];
};

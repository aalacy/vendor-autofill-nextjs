import { Switch, Box, IconButton, Tooltip, Badge, Typography, Stack } from "@mui/material";
import {
  DocumentScanner as ViewIcon,
  AddCircleOutline as AddIcon,
  LocalPoliceOutlined as COIIcon,
  RequestPageOutlined as InvoiceIcon,
  VerifiedOutlined as W9Icon,
} from "@mui/icons-material";
import { useGridApiContext } from "@mui/x-data-grid-pro";
import { useCallback } from "react";
import { currencyFormatter, sum } from "src/utils";

const EditSwitchCell = (params) => {
  const { id, value, row, field, handleCellValueChange } = params;
  const apiRef = useGridApiContext();

  return (
    <Switch
      key={id}
      defaultValue={value}
      onChange={(event) => {
        event.defaultMuiPrevented = true;
        const props = { id: row.id, field, value: event.target.checked };
        handleCellValueChange && handleCellValueChange(props);
        apiRef.current.setEditCellValue({ ...props, debounceMs: 200 });
      }}
    />
  );
};

const FormCell = (params) => {
  const { row, handleGeneratePDF } = params;
  return (
    <Stack direction="row"
justifyContent="center"
spacing={1}>
      {row.vendor.forms?.map((form) => (
        <Tooltip key={form.template_key}
title={form.title}>
          <span>
            <IconButton
              color="info"
              size="small"
              onClick={() => handleGeneratePDF(row.vendor, form)}
            >
              <ViewIcon />
            </IconButton>
          </span>
        </Tooltip>
      ))}
    </Stack>
    // <Box sx={{ display: "flex" }}>
    //   <Tooltip title="Credit Auth">
    //     <span>
    //       <IconButton
    //         onClick={() => handleGeneratePDF(row.vendor, "credit_auth")}
    //         disabled={disabledStatus("credit_auth")}
    //       >
    //         <ViewIcon color={iconColor("credit_auth")} />
    //       </IconButton>
    //     </span>
    //   </Tooltip>
    //   <Tooltip title="Rental Agreement">
    //     <span>
    //       <IconButton
    //         onClick={() => handleGeneratePDF(row.vendor, "rental_agreement")}
    //         disabled={disabledStatus("rental_agreement")}
    //       >
    //         <ViewIcon color={iconColor("rental_agreement")} />
    //       </IconButton>
    //     </span>
    //   </Tooltip>
    //   <Tooltip title="Addition">
    //     <span>
    //       <IconButton
    //         onClick={() => handleGeneratePDF(row.vendor, "addition")}
    //         disabled={disabledStatus("addition")}
    //       >
    //         <InvoiceIcon color={iconColor("addition")} />
    //       </IconButton>
    //     </span>
    //   </Tooltip>
    // </Box>
  );
};

const W9Cell = (params) => {
  const { row, handleW9 } = params;

  return (
    <Tooltip title="Show W9">
      <span>
        <IconButton onClick={() => handleW9(row.vendor)}
disabled={!!!row.vendor.w9}>
          <W9Icon color={row.w9 ? "primary" : "inherit"} />
        </IconButton>
      </span>
    </Tooltip>
  );
};

const COICell = (params) => {
  const { row, handleCOI } = params;

  return (
    <Tooltip title="Manage COI">
      <span>
        <IconButton onClick={() => handleCOI(row.vendor)}>
          {!!!row.vendor.coi ? <AddIcon color="primary" /> : <COIIcon color="inherit" />}
        </IconButton>
      </span>
    </Tooltip>
  );
};

const InvoiceCell = (params) => {
  const { value, row, handleInvoice } = params;

  return (
    <Tooltip title="Manage Forms">
      <span>
        <IconButton onClick={() => handleInvoice(row.vendor)}>
          {!value || value.length === 0 ? (
            <AddIcon color="primary" />
          ) : (
            <Badge badgeContent={row.vendor.invoices.length}
color="info"
max={99}>
              <InvoiceIcon color="primary" />
            </Badge>
          )}
        </IconButton>
      </span>
    </Tooltip>
  );
};

export const VendorsColumns = ({ handleGeneratePDF, handleW9, handleCOI, handleInvoice }) => {
  return [
    {
      field: "vendor_name",
      headerName: "Name",
      type: "string",
      resizable: true,
      valueGetter: (params) => params.row.vendor.name,
      width: 200,
    },
    {
      field: "vendor_w9",
      headerName: "W9",
      type: "string",
      headerAlign: "center",
      align: "center",
      resizable: true,
      width: 80,
      renderCell: (params) => <W9Cell {...params}
handleW9={handleW9} />,
    },
    {
      field: "vendor_coi",
      headerName: "COI",
      type: "string",
      resizable: true,
      width: 80,
      renderCell: (params) => <COICell {...params}
handleCOI={handleCOI} />,
    },
    {
      field: "vendor_invoices",
      headerName: "Invoices",
      type: "string",
      resizable: true,
      width: 80,
      renderCell: (params) => <InvoiceCell {...params}
handleInvoice={handleInvoice} />,
    },
    {
      field: "vendor_forms",
      headerName: "Forms",
      type: "string",
      headerAlign: "center",
      align: "center",
      resizable: true,
      width: 200,
      renderCell: (params) => <FormCell {...params}
handleGeneratePDF={handleGeneratePDF} />,
    },
    {
      field: "vendor_total",
      headerName: "Total",
      type: "string",
      headerAlign: "center",
      align: "center",
      resizable: true,
      width: 120,
      renderCell: (params) => (
        <Typography>
          {currencyFormatter(sum(params.row.vendor.invoices.map((r) => r.total)))}
        </Typography>
      ),
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

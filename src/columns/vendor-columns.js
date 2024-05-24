import { Switch, Box, IconButton, Tooltip, Badge, Typography } from "@mui/material";
import {
  DocumentScanner as ViewIcon,
  AddCircleOutline as AddIcon,
  LocalPoliceOutlined as COIIcon,
  RequestPageOutlined as InvoiceIcon,
  VerifiedOutlined as W9Icon
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
  const { id, row, handleGeneratePDF } = params;
  const disabledStatus = useCallback(
    (name) => {
      if (row[name]) return false;
      return true;
    },
    [row]
  );

  const iconColor = useCallback(
    (name) => {
      if (row[name]) return "primary";
      return "inherit";
    },
    [row]
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Tooltip title="Credit Auth">
        <span>
          <IconButton
            onClick={() => handleGeneratePDF(row, "credit_auth")}
            disabled={disabledStatus("credit_auth")}
          >
            <ViewIcon color={iconColor("credit_auth")} />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Rental Agreement">
        <span>
          <IconButton
            onClick={() => handleGeneratePDF(row, "rental_agreement")}
            disabled={disabledStatus("rental_agreement")}
          >
            <ViewIcon color={iconColor("rental_agreement")} />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Addition">
        <span>
          <IconButton
            onClick={() => handleGeneratePDF(row, "addition")}
            disabled={disabledStatus("addition")}
          >
            <InvoiceIcon color={iconColor("addition")} />
          </IconButton>
        </span>
      </Tooltip>
    </Box>
  );
};

const W9Cell = (params) => {
  const { value, row, handleW9 } = params;

  return (
    <Tooltip title="Show W9">
      <span>
        <IconButton onClick={() => handleW9(row)} disabled={!!!value}>
          <W9Icon color={value ? "primary" : "inherit"} />
        </IconButton>
      </span>
    </Tooltip>
  );
};

const COICell = (params) => {
  const { value, row, handleCOI } = params;

  return (
    <Tooltip title="Manage COI">
      <span>
        <IconButton onClick={() => handleCOI(row)}>
          {!!!value ? <AddIcon color="primary" /> : <COIIcon color="inherit" />}
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
        <IconButton onClick={() => handleInvoice(row)}>
          {!value || value.length === 0 ? (
            <AddIcon color="primary" />
          ) : (
            <Badge badgeContent={value.length} color="info" max={99}>
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
      field: "name",
      headerName: "Name",
      type: "string",
      resizable: true,
      width: 200,
    },
    {
      field: "w9",
      headerName: "W9",
      type: "string",
      headerAlign: "center",
      align: "center",
      resizable: true,
      width: 80,
      renderCell: (params) => <W9Cell {...params} handleW9={handleW9} />,
    },
    {
      field: "coi",
      headerName: "COI",
      type: "string",
      resizable: true,
      width: 80,
      renderCell: (params) => <COICell {...params} handleCOI={handleCOI} />,
    },
    {
      field: "invoices",
      headerName: "Invoices",
      type: "string",
      resizable: true,
      width: 80,
      renderCell: (params) => <InvoiceCell {...params} handleInvoice={handleInvoice} />,
    },
    {
      field: "forms",
      headerName: "Forms",
      type: "string",
      headerAlign: "center",
      align: "center",
      resizable: true,
      width: 200,
      renderCell: (params) => <FormCell {...params} handleGeneratePDF={handleGeneratePDF} />,
    },
    {
      field: "total",
      headerName: "Total",
      type: "string",
      headerAlign: "center",
      align: "center",
      resizable: true,
      width: 120,
      renderCell: (params) => (
        <Typography>{currencyFormatter(sum(params.row.invoices.map((r) => r.total)))}</Typography>
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

import { IconButton, Tooltip, Badge, Typography, Stack } from "@mui/material";
import {
  DocumentScanner as ViewIcon,
  AddCircleOutline as AddIcon,
  LocalPoliceOutlined as COIIcon,
  RequestPageOutlined as InvoiceIcon,
  VerifiedOutlined as W9Icon,
} from "@mui/icons-material";

import { currencyFormatter, sum } from "src/utils";

const FormCell = (params) => {
  const { row, handleGeneratePDF } = params;
  return (
    <Stack direction="row" justifyContent="center" spacing={1}>
      {row.vendor.forms?.map((form) => (
        <Tooltip key={form.name} title={form.title}>
          <span>
            <IconButton color="info" size="small" onClick={(e) => {
              e.stopPropagation();
              handleGeneratePDF(row, form)
            }}>
              <ViewIcon />
            </IconButton>
          </span>
        </Tooltip>
      ))}
    </Stack>
  );
};

const W9Cell = (params) => {
  const { row, handleW9 } = params;

  return (
    <Tooltip title={row.vendor.w9 ? "Show" : "Empty"}>
      <span>
        <IconButton onClick={(e) => {
          e.stopPropagation()
          handleW9(row)
        }} disabled={!!!row.vendor.w9}>
          <W9Icon color={row.vendor.w9 ? "primary" : "inherit"} />
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
        <IconButton onClick={(e) => {
          e.stopPropagation();
          handleCOI(row)
        }}>
          {!!!value ? <AddIcon color="primary" /> : <COIIcon color="inherit" />}
        </IconButton>
      </span>
    </Tooltip>
  );
};

const InvoiceCell = (params) => {
  const { value, row, handleInvoice } = params;

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Tooltip title="Manage Forms">
        <span>
          <IconButton onClick={(e) => {
            e.stopPropagation();
            handleInvoice(row, value)
          }}>
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
      <Typography title="Total">{currencyFormatter(sum(row.invoices.map((r) => r.total)))}</Typography>
    </Stack>
  );
};

export const VendorsColumns = ({ handleGeneratePDF, handleW9, handleCOI, handleInvoice }) => {
  return [
    {
      field: "vendor_w9",
      headerName: "W9",
      type: "string",
      headerAlign: "center",
      align: "center",
      resizable: true,
      width: 80,
      renderCell: (params) => <W9Cell {...params} handleW9={handleW9} />,
    },
    {
      field: "vendor_name",
      headerName: "Vendor Name",
      type: "string",
      resizable: true,
      valueGetter: (params) => params.row.vendor.name,
      width: 200,
    },
    {
      field: "invoices",
      headerName: "Invoices",
      type: "string",
      resizable: true,
      width: 150,
      renderCell: (params) => <InvoiceCell {...params} handleInvoice={handleInvoice} />,
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
      field: "vendor_forms",
      headerName: "Forms",
      type: "string",
      headerAlign: "center",
      align: "center",
      resizable: true,
      width: 150,
      renderCell: (params) => <FormCell {...params} handleGeneratePDF={handleGeneratePDF} />,
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

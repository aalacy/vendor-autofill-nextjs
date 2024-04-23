import { Switch, Box, IconButton, Tooltip } from "@mui/material"
import { DocumentScanner as ViewIcon, AddCircleOutline as AddIcon } from "@mui/icons-material";
import {
  useGridApiContext,
} from "@mui/x-data-grid-pro";
import { useCallback } from "react";

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
        handleCellValueChange && handleCellValueChange(props)
        apiRef.current.setEditCellValue({ ...props, debounceMs: 200 })
      }
      }
    />
  );
}

const InvoiceCell = (params) => {
  const { id, row, handleGeneratePDF } = params;
  const disabledStatus = useCallback((name) => {
    if (row[name]) return false
    return true
  }, [row])

  const iconColor = useCallback((name) => {
    if (row[name]) return 'primary'
    return 'inherit'
  }, [row]);

  return (
    <Box sx={{ display: "flex" }}>
      <Tooltip title="Credit Auth">
        <span>
          <IconButton
            onClick={() => handleGeneratePDF(row, 'credit_auth')}
            disabled={disabledStatus('credit_auth')}
          >
            <ViewIcon color={iconColor('credit_auth')} /></IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Rental Agreement">
        <span>
          <IconButton
            onClick={() => handleGeneratePDF(row, 'rental_agreement')}
            disabled={disabledStatus('rental_agreement')}
          >
            <ViewIcon color={iconColor('rental_agreement')} /></IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Addition">
        <span>
          <IconButton
            onClick={() => handleGeneratePDF(row, 'addition')}
            disabled={disabledStatus('addition')}
          >
            <ViewIcon color={iconColor('addition')} /></IconButton>
        </span>
      </Tooltip>
    </Box>
  );
}

const W9Cell = (params) => {
  const { value, row, handleW9 } = params;

  return (
    <Tooltip title="Show W9">
      <span>
        <IconButton
          onClick={() => handleW9(row)}
          disabled={!!!value}
        >
          <ViewIcon color={value ? 'primary' : 'inherit'} /></IconButton>
      </span>
    </Tooltip>
  )
}

const COICell = (params) => {
  const { value, row, handleCOI } = params;

  return (
    <Tooltip title="Manage COI">
      <span>
        <IconButton
          onClick={() => handleCOI(row)}
        >
          {
            !!!value ? <AddIcon color={value ? 'primary' : 'inherit'} /> : 
            <ViewIcon color={value ? 'primary' : 'inherit'} />
          }
        </IconButton>
      </span>
    </Tooltip>
  )
}

const FormsCell = (params) => {
  const { value, row } = params;

  return (
    <Tooltip title="Manage Forms">
      <span>
        <IconButton
          disabled={!!!value}
        >
          <ViewIcon color={value ? 'primary' : 'inherit'} /></IconButton>
      </span>
    </Tooltip>
  )
}


export const VendorsColumns = ({ handleGeneratePDF, handleW9, handleCOI }) => {
  return [
    {
      field: "name",
      headerName: "Name",
      type: "string",
      resizable: true,
      width: 200
    },
    {
      field: "w9",
      headerName: "W9",
      type: "string",
      headerAlign: 'center',
      align: 'center',
      resizable: true,
      width: 80,
      renderCell: (params) => <W9Cell {...params} handleW9={handleW9} />
    },
    {
      field: "coi",
      headerName: "COI",
      type: "string",
      resizable: true,
      width: 80,
      renderCell: (params) => <COICell {...params} handleCOI={handleCOI} />
    },
    {
      field: "forms",
      headerName: "Forms",
      type: "string",
      resizable: true,
      width: 80,
      renderCell: (params) => <FormsCell {...params} />
    },
    {
      field: "invoices",
      headerName: "Invoices",
      type: "string",
      headerAlign: 'center',
      align: 'center',
      resizable: true,
      width: 200,
      renderCell: (params) => <InvoiceCell {...params} handleGeneratePDF={handleGeneratePDF} />
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
  ]
}
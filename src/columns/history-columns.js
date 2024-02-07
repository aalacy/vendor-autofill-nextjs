import { IconButton, Tooltip } from "@mui/material";
import { FileOpen as ViewIcon } from "@mui/icons-material";
import { beautyDateTime } from "src/utils";

export const HistoryColumns = ({ handleView }) => {
  return [
    {
      field: "vendor_name",
      headerName: "Vendor Name",
      type: "string",
      resizable: true,
      width: 200,
      valueGetter: (params) => params.row.vendor.name,
    },
    {
      field: "type",
      headerName: "Type",
      type: "string",
      resizable: true,
      width: 200,
      valueGetter: (params) => params.value,
    },
    {
      field: "created_at",
      headerName: "Created",
      type: "date",
      resizable: true,
      width: 160,
      valueGetter: (params) => new Date(params.value),
      renderCell: (params) => <div>{beautyDateTime(params?.value)}</div>,
    },
    {
      field: "url",
      headerName: "PDF",
      type: "string",
      resizable: true,
      filterable: false,
      width: 60,
      renderCell: (params) => (
        <Tooltip title="View PDF">
          <IconButton color="primary" onClick={() => handleView(params.value, params.row)}>
            <ViewIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ];
};

import { IconButton, Tooltip } from "@mui/material";
import { FileOpen as ViewIcon, Download as DownloadIcon } from "@mui/icons-material";
import { beautyDateTime, downloadMedia } from "src/utils";

const PDFCell = ({ params, type, handleView }) => (
  <>
    <Tooltip title="View PDF">
      <span>
        <IconButton
          disabled={!params.value}
          color="primary"
          onClick={() => handleView(params.value, params.row, type)}
        >
          <ViewIcon />
        </IconButton>
      </span>
    </Tooltip>
    <Tooltip title="Download PDF">
      <span>
        <IconButton
          disabled={!params.value}
          color="secondary"
          onClick={() => downloadMedia(params.row.vendor_name, params.value)}
        >
          <DownloadIcon />
        </IconButton>
      </span>
    </Tooltip>
  </>
);

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
      field: "credit_auth",
      headerName: "Credit Auth",
      type: "string",
      resizable: true,
      width: 150,
      renderCell: (params) => (
        <PDFCell type="Credit Auth" params={params} handleView={handleView} />
      ),
    },
    {
      field: "rental_agreement",
      headerName: "Rental Agreement",
      type: "string",
      resizable: true,
      width: 150,
      renderCell: (params) => (
        <PDFCell type="Rental Agreement" params={params} handleView={handleView} />
      ),
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
  ];
};

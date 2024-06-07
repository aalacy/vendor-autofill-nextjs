import { Typography, IconButton, Tooltip, Box, CircularProgress } from "@mui/material";
import {
  DeleteOutline as ClearIcon,
  EditOutlined as EditIcon,
  FileOpen as ViewIcon,
  Download as DownloadIcon,
} from "@mui/icons-material";

import { beautyDate, formatLocalNumber, sum } from "src/utils";

const RenderAction = (props) => {
  const { value, row, handleRemove, handleEdit, handleView, handleDownload, loadingGet } = props;

  return (
    <Box>
      <Tooltip title="Edit Mileage">
        <span>
          <IconButton onClick={() => handleEdit(value)}
size="small"
color="info">
            <EditIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="View PDF">
        <span>
          <IconButton size="small"
color="primary"
onClick={() => handleView(row)}>
            {loadingGet ? <CircularProgress /> : <ViewIcon />}
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Download PDF">
        <span>
          <IconButton size="small"
color="secondary"
onClick={() => handleDownload(row)}>
            {loadingGet ? <CircularProgress /> : <DownloadIcon />}
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Delete Mileage">
        <span>
          <IconButton onClick={() => handleRemove(value)}
color="error"
size="small">
            <ClearIcon />
          </IconButton>
        </span>
      </Tooltip>
    </Box>
  );
};

export const MileagesColumns = ({
  handleRemove,
  handleEdit,
  handleView,
  handleDownload,
  loadingGet,
}) => {
  return [
    {
      field: "name",
      headerName: "Name",
      type: "string",
      resizable: true,
      width: 200,
      renderCell: (params) => (
        <div>
          <Typography textTransform="uppercase">{params.row.name}</Typography>
        </div>
      ),
    },
    {
      field: "week_of",
      headerName: "Week of",
      type: "string",
      resizable: true,
      editable: true,
      width: 120,
      valueGetter: (params) => beautyDate(params.value),
    },
    {
      field: "miles_travelled",
      headerName: "Miles Travelled",
      type: "string",
      resizable: true,
      width: 150,
      renderCell: (params) => (
        <Typography>
          {formatLocalNumber(sum(params.row.data.map((d) => d.number_of_miles)))}
        </Typography>
      ),
    },
    {
      field: "reimbursement_amount",
      headerName: "Reimbursement",
      type: "string",
      resizable: true,
      width: 150,
      renderCell: (params) => (
        <Typography>
          ${formatLocalNumber(sum(params.row.data.map((d) => d.mileage_reimbursement)))}
        </Typography>
      ),
    },
    {
      field: "modified_at",
      headerName: "Created",
      type: "string",
      resizable: true,
      width: 130,
      valueGetter: (params) => beautyDate(params.value),
    },
    {
      field: "id",
      type: "actions",
      headerName: "Actions",
      headerAlign: "center",
      align: "center",
      description: "Action Column",
      sortable: false,
      width: 140,
      renderCell: (params) => (
        <RenderAction
          {...params}
          handleRemove={handleRemove}
          handleEdit={handleEdit}
          handleView={handleView}
          handleDownload={handleDownload}
          loadingGet={loadingGet}
        />
      ),
    },
  ];
};

export const MileageDetailColumns = [
  {
    field: "date",
    headerName: "Date",
    type: "string",
    resizable: true,
    width: 100,
    valueGetter: (params) => beautyDate(params.value),
  },
  {
    field: "from_address",
    headerName: "From Address",
    type: "string",
    resizable: true,
    width: 200,
  },
  {
    field: "to_address",
    headerName: "To Address",
    type: "string",
    resizable: true,
    width: 200,
  },
  {
    field: "business_purpose",
    headerName: "Business Purpose",
    type: "string",
    resizable: true,
    width: 140,
  },
  {
    field: "number_of_miles",
    headerName: "# of Miles",
    type: "string",
    resizable: true,
    width: 140,
    valueGetter: (params) => formatLocalNumber(params.value),
  },
  {
    field: "mileage_reimbursement",
    headerName: "Mileage Reimbursement($)",
    type: "string",
    resizable: true,
    width: 200,
    valueGetter: (params) => formatLocalNumber(params.value),
  },
];

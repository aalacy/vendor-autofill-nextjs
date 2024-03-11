import { Typography, IconButton, Tooltip, Box, CircularProgress } from "@mui/material";
import {
  Clear as ClearIcon,
  EditOutlined as EditIcon,
  FileOpen as ViewIcon,
  Download as DownloadIcon,
} from "@mui/icons-material";

import { beautyDate, beautyDateTime, formatLocalNumber } from "src/utils";
import { permanent_marker } from "src/theme/font";

const RenderAction = (props) => {
  const { value, row, handleRemove, handleEdit, handleView, handleDownload, loadingGet } = props;

  return (
    <Box>
      <Tooltip title="Edit Mileage">
        <span>
          <IconButton
            onClick={() => handleEdit(value)}
            size="small"
            sx={{
              ml: 3,
            }}
          >
            <EditIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="View PDF">
        <span>
          <IconButton color="primary" onClick={() => handleView(row)}>
            {loadingGet ? <CircularProgress /> : <ViewIcon />}
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Download PDF">
        <span>
          <IconButton color="secondary" onClick={() => handleDownload(row)}>
            {loadingGet ? <CircularProgress /> : <DownloadIcon />}
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Remove Mileage">
        <span>
          <IconButton onClick={() => handleRemove(value)} color="error" size="small">
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
      width: 100,
    },
    {
      field: "employee_signature",
      headerName: "Employee Signature",
      type: "string",
      resizable: true,
      editable: true,
      width: 200,
      renderCell: (params) => (
        <div>
          <Typography textTransform="uppercase" fontFamily={permanent_marker.style.fontFamily}>
            {params.row.employee_signature}
          </Typography>
          <Typography variant="caption">
            {beautyDate(params.row.employee_signature_date)}
          </Typography>
        </div>
      ),
    },
    {
      field: "approval_signature",
      headerName: "Approval Signature",
      type: "string",
      resizable: true,
      editable: true,
      width: 200,
      renderCell: (params) => (
        <div>
          <Typography textTransform="uppercase" fontFamily={permanent_marker.style.fontFamily}>
            {params.row.approval_signature}
          </Typography>
          <Typography variant="caption">
            {beautyDate(params.row.approval_signature_date)}
          </Typography>
        </div>
      ),
    },
    {
      field: "created_at",
      headerName: "Created",
      type: "string",
      resizable: true,
      width: 140,
      valueGetter: (params) => beautyDateTime(params.value),
    },
    {
      field: "id",
      type: "actions",
      headerName: "Actions",
      headerAlign: "center",
      description: "Action Column",
      sortable: false,
      width: 200,
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

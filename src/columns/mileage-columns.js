import { Typography, IconButton, Tooltip, Box, CircularProgress, Stack } from "@mui/material";
import {
  DeleteOutline as ClearIcon,
  EditOutlined as EditIcon,
  FileOpen as ViewIcon,
  Download as DownloadIcon,
  AccessTime,
  Room,
  Directions,
  AttachMoneyOutlined,
} from "@mui/icons-material";

import { beautyDate, formatLocalNumber, sum } from "src/utils";

const RenderAction = (props) => {
  const { value, row, handleRemove, handleEdit, handleView, handleDownload, loadingGet } = props;

  return (
    <Box>
      <Tooltip title="Edit Mileage">
        <span>
          <IconButton onClick={() => handleEdit(value)} size="small" color="info">
            <EditIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="View PDF">
        <span>
          <IconButton size="small" color="primary" onClick={() => handleView(row)}>
            {loadingGet ? <CircularProgress /> : <ViewIcon />}
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Download PDF">
        <span>
          <IconButton size="small" color="secondary" onClick={() => handleDownload(row)}>
            {loadingGet ? <CircularProgress /> : <DownloadIcon />}
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Delete Mileage">
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
    field: "date_business_purpose",
    headerName: "Business Purpose",
    type: "string",
    resizable: true,
    width: 200,
    renderCell: (params) => (
      <Stack spacing={1}>
        <Typography>{params.row.business_purpose}</Typography>
        <Stack direction="row" spacing={1}>
          <AccessTime fontSize="small" />
          <Typography color="GrayText" variant="subtitle2">
            {beautyDate(params.row.date)}
          </Typography>
        </Stack>
      </Stack>
    ),
  },
  {
    field: "address",
    headerName: "From-To Address",
    type: "string",
    resizable: true,
    width: 250,
    renderCell: (params) => (
      <Stack spacing={1}>
        <Stack direction="row" spacing={1}>
          <Room /> <Typography>{params.row.from_address}</Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Room />
          <Typography>{params.row.to_address}</Typography>
        </Stack>
      </Stack>
    ),
  },
  {
    field: "miles",
    headerName: "# of Miles",
    type: "string",
    resizable: true,
    width: 140,
    renderCell: (params) => (
      <Stack spacing={1}>
        <Stack direction="row" spacing={1}>
          <Directions /> <Typography>{formatLocalNumber(params.row.number_of_miles)}</Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <AttachMoneyOutlined />
          <Typography color="GrayText">{params.row.mileage_reimbursement}</Typography>
        </Stack>
      </Stack>
    ),
  },
];

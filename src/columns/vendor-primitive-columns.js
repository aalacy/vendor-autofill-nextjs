import { Typography, IconButton, Tooltip, Box, Avatar, Chip, Badge, Checkbox } from "@mui/material";
import {
  Clear as ClearIcon,
  EditOutlined as EditIcon,
  LaunchOutlined,
  AccountCircle as UserCircleIcon,
} from "@mui/icons-material";
import { beautyDateTime } from "src/utils";
import { useCallback } from "react";
import { CreditAuthList, RentalAgreementList } from "src/utils/constants";

const RenderAction = (props) => {
  const { handleEdit, row } = props;

  return (
    <Box>
      <Tooltip title="Edit Vendor">
        <span>
          <IconButton
            onClick={() => handleEdit(row)}
            size="small"
            sx={{
              ml: 3,
            }}
            color="secondary"
          >
            <EditIcon />
          </IconButton>
        </span>
      </Tooltip>
      {/* <Tooltip title="Remove Contact">
    <span>
      <IconButton
        onClick={() => handleRemove(value)}
        color="error"
        size="small"
      >
        <ClearIcon />
      </IconButton>
    </span>
  </Tooltip> */}
    </Box>
  );
};

export const PrimitiveVendorsColumns = ({ handleRemove, handleEdit }) => {
  const selectedCreditAuth = useCallback(
    (selected) => {
      return CreditAuthList.find(({ script }) => script === selected);
    },
    [CreditAuthList]
  );

  const selectedRentalAgreemtn = useCallback(
    (selected) => {
      return RentalAgreementList.find(({ script }) => script === selected);
    },
    [RentalAgreementList]
  );

  return [
    {
      field: "name",
      headerName: "Name",
      type: "string",
      resizable: true,
      width: 200,
    },
    {
      field: "credit_auth",
      headerName: "Credit Auth",
      resizable: true,
      width: 100,
      align: 'center',
      renderCell: (params) => (
        <Tooltip title={ selectedCreditAuth(params.value) ? "Show template": "No template"}>
          <span>
          <IconButton
            disabled={!!!selectedCreditAuth(params.value)}
            color="info"
            size="small"
            href={selectedCreditAuth(params.value)?.link}
          >
            <LaunchOutlined />{" "}
          </IconButton>
          </span>
        </Tooltip>
      ),
    },
    {
      field: "rental_agreement",
      headerName: "Rental Agreement",
      resizable: true,
      align: 'center',
      width: 140,
      renderCell: (params) => (
        <Tooltip title={ selectedRentalAgreemtn(params.value) ? "Show template": "No template"}>
          <span>
          <IconButton
            disabled={!!!selectedRentalAgreemtn(params.value)}
            color="info"
            size="small"
            href={selectedRentalAgreemtn(params.value)?.link}
          >
            <LaunchOutlined />{" "}
          </IconButton>
          </span>
        </Tooltip>
      ),
    },
    {
      field: "addition",
      headerName: "Addition",
      resizable: true,
      align: 'center',
      width: 100,
    },
    {
      field: "created_at",
      headerName: "Created At",
      type: "string",
      resizable: true,
      width: 150,
      valueGetter: (params) => new Date(params.value),
      renderCell: (params) => <div>{beautyDateTime(params?.value)}</div>,
    },
    {
      field: "user",
      headerName: "Created By",
      type: "string",
      resizable: true,
      width: 150,
      renderCell: (params) => (
        <Box>
          <Typography fontWeight="bold">
            {params.value.person.first_name} {params.value.person.first_name}
          </Typography>
          <Typography variant="caption">{params.value.email}</Typography>
        </Box>
      ),
    },
    {
      field: "id",
      type: "actions",
      headerName: "",
      headerAlign: "center",
      align: "center",
      description: "Action Column",
      sortable: false,
      width: 60,
      renderCell: (params) => (
        <RenderAction {...params} handleRemove={handleRemove} handleEdit={handleEdit} />
      ),
    },
  ];
};

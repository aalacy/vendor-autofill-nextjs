import { Typography, IconButton, Tooltip, Box, Checkbox } from "@mui/material";
import {
  EditOutlined as EditIcon,
  LaunchOutlined,
  Clear as ClearIcon,
} from "@mui/icons-material";
import { useCallback } from "react";

import { beautyDateTime } from "src/utils";
import { CreditAuthList, RentalAgreementList } from "src/utils/constants";

const RenderAction = (props) => {
  const { handleEdit, handleRemove, row } = props;

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
      <Tooltip title="Remove Vendor">
    <span>
      <IconButton
        onClick={() => handleRemove(row)}
        color="error"
        size="small"
      >
        <ClearIcon />
      </IconButton>
    </span>
  </Tooltip>
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
      filterable: false,
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
      filterable: false,
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
      filterable: false,
      align: 'center',
      width: 100,
    },
    {
      field: "created_at",
      headerName: "Created At",
      type: "date",
      filterable: false,
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
      filterable: false,
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
      field: "active",
      headerName: "Status",
      resizable: true,
      width: 80,
      type: 'boolean',
  
      renderCell: (params) => <Checkbox readOnly checked={params?.value}></Checkbox>,
    },
    {
      field: "id",
      type: "actions",
      headerName: "",
      align: "center",
      description: "Action Column",
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <RenderAction {...params} handleRemove={handleRemove} handleEdit={handleEdit} />
      ),
    },
  ];
};
import { Typography, IconButton, Tooltip, Box, Button, Stack } from "@mui/material";
import {
  EditOutlined as EditIcon,
  Clear as ClearIcon,
  AddCircleOutline as AddIcon,
  DocumentScanner as ViewIcon,
} from "@mui/icons-material";

import { beautyDateTime } from "src/utils";

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
          <IconButton onClick={() => handleRemove(row)}
color="error"
size="small">
            <ClearIcon />
          </IconButton>
        </span>
      </Tooltip>
    </Box>
  );
};

const RenderActionHeader = (props) => {
  const { handleAdd, row } = props;

  return (
    <Tooltip title="Add Vendor">
      <span>
        <Button onClick={() => handleAdd(row)}
size="small"
color="info"
startIcon={<AddIcon />}>
          Add
        </Button>
      </span>
    </Tooltip>
  );
};

export const PrimitiveVendorsColumns = ({ handleRemove, handleEdit, handleAdd, handleOpenPDF }) => {
  return [
    {
      field: "name",
      headerName: "Name",
      type: "string",
      resizable: true,
      width: 200,
    },
    {
      field: "forms",
      headerName: "Forms",
      resizable: true,
      width: 100,
      filterable: false,
      align: "center",
      renderCell: (params) => (
        <Stack direction="row"
justifyContent="center">
          {params.value?.map((form) => (
            <Tooltip key={form.template_key}
title={form.title}>
              <span>
                <IconButton
                  color="info"
                  size="small"
                  onClick={() => handleOpenPDF(params.row, form)}
                >
                  <ViewIcon />{" "}
                </IconButton>
              </span>
            </Tooltip>
          ))}
        </Stack>
      ),
    },
    // {
    //   field: "rental_agreement",
    //   headerName: "Rental Agreement",
    //   resizable: true,
    //   filterable: false,
    //   align: "center",
    //   width: 140,
    //   renderCell: (params) => (
    //     <Tooltip title={selectedRentalAgreement(params.value) ? "Show template" : "No template"}>
    //       <span>
    //         <IconButton
    //           disabled={!!!selectedRentalAgreement(params.value)}
    //           color="info"
    //           size="small"
    //           href={selectedRentalAgreement(params.value)?.link}
    //         >
    //           <LaunchOutlined />{" "}
    //         </IconButton>
    //       </span>
    //     </Tooltip>
    //   ),
    // },
    // {
    //   field: "addition",
    //   headerName: "Addition",
    //   resizable: true,
    //   filterable: false,
    //   align: "center",
    //   width: 100,
    // },
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
    // {
    //   field: "active",
    //   headerName: "Status",
    //   resizable: true,
    //   width: 80,
    //   type: "boolean",

    //   renderCell: (params) => <Checkbox readOnly checked={params?.value}></Checkbox>,
    // },
    {
      field: "id",
      type: "actions",
      align: "center",
      description: "Action Column",
      renderHeader: (params) => <RenderActionHeader {...params}
handleAdd={handleAdd} />,
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <RenderAction {...params}
handleRemove={handleRemove}
handleEdit={handleEdit} />
      ),
    },
  ];
};

import { Box, IconButton, Tooltip, Badge, Typography } from "@mui/material";
import { beautyDateTime } from "src/utils";

export const PrimitiveVendorsColumns = ({}) => {
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
    },
    {
      field: "rental_agreement",
      headerName: "Rental Agreement",
      resizable: true,
      width: 300,
    },
    {
      field: "addition",
      headerName: "Addition",
      resizable: true,
      width: 200,
    },
    {
      field: "created_at",
      headerName: "Created",
      type: "string",
      resizable: true,
      width: 150,
      valueGetter: (params) => new Date(params.value),
      renderCell: (params) => <div>{beautyDateTime(params?.value)}</div>,
    },
    {
      field: "user",
      headerName: "User",
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
  ];
};

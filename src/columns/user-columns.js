import { Typography, IconButton, Tooltip, Box, Avatar, Chip } from "@mui/material";
import {
  EditOutlined as EditIcon,
  AccountCircle as UserCircleIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";
import { useCallback } from "react";

const RenderAction = (props) => {
  const { handleEdit, handleRemove, row } = props;

  return (
    <Box>
      <Tooltip title="Edit User">
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
      <Tooltip title="Remove User">
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

export const UserColumns = ({ handleEdit, handleRemove }) => {
  const subscriptionLabel = useCallback((subscriptions) => {
    if (subscriptions.length < 1) return "Free";
    const { interval, interval_count } = subscriptions[0].meta_data;
    if (interval === "month") {
      if (interval_count === 1) return "Monthly";
      return "Bi-Annual";
    } else {
      return "Yearly";
    }
  }, []);

  const subscriptionColor = useCallback(
    (subscriptions) => {
      const label = subscriptionLabel(subscriptions);
      if (label === "Free") return "error";
      return "primary";
    },
    [subscriptionLabel],
  );

  return [
    {
      field: "avatar",
      headerName: "",
      type: "string",
      width: 80,
      renderCell: (params) => (
        <Avatar
          src={params.value || "/assets/avatars/no-profile1.png"}
          sx={{
            height: 35,
            width: 35,
            outline: "1px solid lightgray",
          }}
        >
          <UserCircleIcon fontSize="small" />
        </Avatar>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      type: "string",
      resizable: true,
      width: 150,
      renderCell: (params) => (
        <Typography textTransform="capitalize">
          {params.row.person.first_name} {params.row.person.last_name}
        </Typography>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      type: "string",
      resizable: true,
      width: 150,
    },
    {
      field: "title",
      headerName: "Title",
      type: "string",
      resizable: true,
      width: 150,
      renderCell: (params) => (
        <Typography textTransform="capitalize">{params.row.person.title}</Typography>
      ),
    },
    {
      field: "phone",
      headerName: "Phone",
      type: "string",
      resizable: true,
      width: 150,
      valueGetter: (params) => params.row.person.phone,
    },
    {
      field: "roles",
      headerName: "Roles",
      type: "string",
      align: "center",
      resizable: true,
      width: 150,
      renderCell: (params) => (
        <>
          {params.row.roles.map(({ role_name }) => (
            <Chip
              key={role_name}
              size="small"
              sx={{ mr: 1 }}
              color={role_name === "admin" ? "primary" : "success"}
              label={<Typography textTransform="capitalize">{role_name}</Typography>}
            />
          ))}
        </>
      ),
    },
    {
      field: "subscriptions",
      headerName: "Subscription",
      type: "string",
      align: "center",
      resizable: true,
      width: 150,
      renderCell: (params) => (
        <Chip
          size="small"
          color={subscriptionColor(params.value)}
          label={subscriptionLabel(params.value)}
        />
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
      width: 100,
      renderCell: (params) => (
        <RenderAction {...params}
handleRemove={handleRemove}
handleEdit={handleEdit} />
      ),
    },
  ];
};

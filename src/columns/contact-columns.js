import { Typography, IconButton, Tooltip, Box } from "@mui/material"; 
import { Clear as ClearIcon, EditOutlined as EditIcon } from "@mui/icons-material";

const RenderAction = (props) => {
  const { value, handleRemove, handleEdit } = props;

  return (
    <Box>
      <Tooltip title="Edit Contact">
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
      <Tooltip title="Remove Contact">
      <span>
        <IconButton
          onClick={() => handleRemove(value)}
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

export const ContactsColumns = ({ handleRemove, handleEdit }) => {
    return [
      {
        field: "name_position",
        headerName: "Name",
        type: "string",
        resizable: true,
        width: 250,
        renderCell: (params) => <div>
          <Typography textTransform="uppercase">{params.row.first_name} {params.row.last_name}</Typography>
          <Typography fontWeight="bold">{params.row.position}</Typography>
        </div>
      },
      // {
      //   field: "email",
      //   headerName: "Email",
      //   type: "string",
      //   resizable: true,
      //   editable: true,
      //   width: 200,
      // },
      {
        field: "phone_email",
        headerName: "Phone",
        type: "string",
        resizable: true,
        width: 250,
        renderCell: (params) => <div>
          <Typography textTransform="uppercase">{params.row.phone}</Typography>
          <Typography fontWeight="bold">{params.row.email}</Typography>
        </div>
      },
      // {
      //   field: "role",
      //   headerName: "Position",
      //   editable: true,
      //   type: "string",
      //   resizable: true,
      //   width: 200,
      // },
      {
        field: "department",
        headerName: "Department",
        type: 'string',
        resizable: true,
        width: 120,
      },
      {
        field: "union",
        headerName: "Union",
        type: "text",
        resizable: true,
        width: 200,
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
          />
        ),
      }
    ]
}
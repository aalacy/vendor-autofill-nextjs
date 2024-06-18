import { IconButton, Tooltip, Box, Button } from "@mui/material";
import {
  EditOutlined as EditIcon,
  Clear as ClearIcon,
  AddCircleOutline as AddIcon,
} from "@mui/icons-material";
import { beautyDate } from "src/utils";

const RenderAction = (props) => {
  const { handleEdit, handleRemove, row, value } = props;

  return (
    <Box>
      <Tooltip title="Edit Faq">
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
      <Tooltip title="Remove Faq">
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

const RenderActionHeader = (props) => {
  const { handleAdd, row } = props;

  return (
    <Tooltip title="Add Faq">
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

export const FaqColumns = ({ handleEdit, handleAdd, handleRemove }) => {
  return [
    {
      field: "question",
      headerName: "Question",
      type: "string",
      resizable: true,
      width: 200,
    },
    {
      field: "answer",
      headerName: "Answer",
      type: "string",
      width: 350,
      resizable: true,
    },
    {
      field: "created_at",
      headerName: "Created",
      type: "date",
      resizable: true,
      width: 120,
      valueGetter: (params) => new Date(params.value),
      renderCell: (params) => <div>{beautyDate(params?.value)}</div>,
    },
    {
      field: "id",
      type: "actions",
      headerName: "",
      headerAlign: "center",
      renderHeader: (params) => <RenderActionHeader {...params}
handleAdd={handleAdd} />,
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

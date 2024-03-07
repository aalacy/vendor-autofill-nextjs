import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import { DeleteOutline as RemoveIcon } from "@mui/icons-material";

import { Modal } from "../common/modal";
import { beautyDateTime, bytesToSize } from "src/utils";

export const FolderDetail = ({ open, setOpen, folder, removeItem }) => {
  const onClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      title={`${folder?.folder_name} - ${folder?.files.length} items`}
      open={open}
      onClose={onClose}
      size="md"
    >
      <List sx={{ height: "100vh", overflow: "auto" }}>
        {folder?.files?.map(({ key, file_name, size, created_at }) => (
          <ListItem key={file_name} sx={{ mb: 2, boxShadow: 4 }}>
            <ListItemText primary={file_name} secondary={`${bytesToSize(size)}`} />
            <ListItemText primary="Created at" secondary={beautyDateTime(created_at)} />
            <IconButton color="error" onClick={() => removeItem(key)}>
              <RemoveIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Modal>
  );
};

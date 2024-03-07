import {
  ListItemButton,
  Popper,
  Box,
  Button,
  ListItemText,
  ListItemAvatar,
  IconButton,
} from "@mui/material";
import {
  MoreHoriz as MoreVertIcon,
  Delete as RemoveIcon,
  FolderOutlined as FolderIcon,
} from "@mui/icons-material";
import { useState } from "react";

import { beautyDateTime, bytesToSize } from "src/utils";

export const FileItem = ({ folder, removeItem, setFolder, setOpen }) => {
  const { folder_name, size, created_at, files } = folder;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMore = (event) => {
    event.stopPropagation();
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleRemove = () => {
    setAnchorEl(null);
    removeItem(folder_name)
  };

  const handleFolder = () => {
    setFolder(folder);
    setOpen(true)
  }

  const open = Boolean(anchorEl);
  const id = open ? "more-popper" : undefined;

  return (
    <>
      <ListItemButton sx={{ mb: 2, boxShadow: 4 }} onClick={handleFolder}>
        <ListItemAvatar>
          <FolderIcon color="warning" fontSize="large" />
        </ListItemAvatar>
        <ListItemText
          primary={folder_name}
          secondary={`${bytesToSize(size)} • ${files.length} items`}
        />
        <ListItemText primary="Created at" secondary={beautyDateTime(created_at)} />
        <IconButton aria-describedby={id} onClick={handleMore}>
          <MoreVertIcon />
        </IconButton>
      </ListItemButton>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <Box sx={{ border: 1, p: 1 }}>
          <Button color="error" onClick={handleRemove} startIcon={<RemoveIcon />} size="small">
            Delete
          </Button>
        </Box>
      </Popper>
    </>
  );
};

import {
  ListItemButton,
  Popper,
  Box,
  Button,
  ListItemText,
  ListItemAvatar,
  IconButton,
  Typography,
  ClickAwayListener,
  Paper,
} from "@mui/material";
import {
  MoreHoriz as MoreVertIcon,
  DeleteOutline as RemoveIcon,
  FolderOutlined as FolderIcon,
  Download as DownloadIcon,
} from "@mui/icons-material";
import { useState } from "react";

import { beautyDateTime, bytesToSize } from "src/utils";

export const FileItem = ({ downloadFiles, folder, removeItem, setFolder, setOpen }) => {
  const { folder_name, size, created_at, files } = folder;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMore = (event) => {
    event.stopPropagation();
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleRemove = () => {
    setAnchorEl(null);
    const keys = files.map(({ key }) => key);
    removeItem(folder_name, true, keys);
  };

  const handleDownload = () => {
    setAnchorEl(null);
    downloadFiles([folder]);
  };

  const handleFolder = () => {
    setFolder(folder);
    setOpen(true);
  };

  const open = Boolean(anchorEl);
  const id = open ? "more-popper" : undefined;

  return (
    <>
      <ListItemButton sx={{ mb: 2, boxShadow: 4 }} onClick={handleFolder}>
        <ListItemAvatar>
          <FolderIcon color="warning" fontSize="large" />
        </ListItemAvatar>
        <ListItemText
          primary={<Typography noWrap>{folder_name}</Typography>}
          secondary={`${bytesToSize(size)} • ${files.length} items`}
        />
        <ListItemText primary="Created at" secondary={beautyDateTime(created_at)} />
        <IconButton aria-describedby={id} onClick={handleMore}>
          <MoreVertIcon />
        </IconButton>
      </ListItemButton>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <ClickAwayListener onClickAway={handleClose}>
          <Paper>
            <Box
              sx={{
                p: 1,
                border: 1,
                borderRadius: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Button
                color="info"
                onClick={handleDownload}
                startIcon={<DownloadIcon />}
                size="small"
              >
                Download
              </Button>
              <Button color="error" onClick={handleRemove} startIcon={<RemoveIcon />} size="small">
                Delete
              </Button>
            </Box>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </>
  );
};

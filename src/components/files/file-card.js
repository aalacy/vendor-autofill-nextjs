import {
  Card,
  CardContent,
  IconButton,
  Typography,
  CardHeader,
  Divider,
  Popper,
  Box,
  Button,
  CardActionArea,
  ClickAwayListener
} from "@mui/material";
import {
  MoreHoriz as MoreVertIcon,
  Download as DownloadIcon,
  Delete as RemoveIcon,
  FolderOutlined as FolderIcon,
} from "@mui/icons-material";
import { beautyDateTime, bytesToSize } from "src/utils";
import { useState } from "react";

export const FileCard = ({ downloadFiles, folder, removeItem, setFolder, setOpen }) => {
  const { folder_name, size, created_at, files } = folder;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMore = (event) => {
    event.stopPropagation();
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null)

  const handleRemove = () => {
    handleClose()
    removeItem(folder_name);
  };

  const handleDownload = () => {
    handleClose()
    downloadFiles([folder])
  }

  const handleFolder = () => {
    setFolder(folder);
    setOpen(true)
  };

  const open = Boolean(anchorEl);
  const id = open ? "more-popper" : undefined;

  return (
    <>
      <Card raised sx={{ minWidth: 235 }}>
        <CardActionArea onClick={handleFolder}>
          <CardHeader
            avatar={<FolderIcon color="warning" fontSize="large" />}
            action={
              <IconButton onClick={handleMore} aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
          />
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {folder_name}
            </Typography>
            <Divider />
            <Typography variant="body2" mt={2}>
              {bytesToSize(size)} • {files.length} items
            </Typography>
            <Typography variant="caption">Created at {beautyDateTime(created_at)}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <ClickAwayListener onClickAway={handleClose}>
          <Box sx={{ p: 1, border: 1, borderRadius: 1, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <Button color="info" onClick={handleDownload} startIcon={<DownloadIcon />} size="small">
              Download
            </Button>
            <Button color="error" onClick={handleRemove} startIcon={<RemoveIcon />} size="small">
              Delete
            </Button>
          </Box>
        </ClickAwayListener>
      </Popper>
    </>
  );
};

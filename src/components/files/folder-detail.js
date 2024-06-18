import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  CircularProgress,
  Typography,
} from "@mui/material";
import {
  DeleteOutline as RemoveIcon,
  DocumentScanner as PDFIcon,
  Download as DownloadIcon,
} from "@mui/icons-material";
import { useState } from "react";
import dynamic from "next/dynamic";

import { Modal } from "../common/modal";
import { beautyDateTime, bytesToSize, downloadMedia } from "src/utils";
const PdfViewer = dynamic(() => import("../history/pdf-viewer"), { ssr: false });
import { FileService } from "src/services";

const FolderDetail = ({ open, setOpen, folder, removeItem }) => {
  const [pdfUrl, setUrl] = useState("");
  const [file, setFile] = useState("");
  const [openPDF, setOpenPDF] = useState(false);
  const [loading, setLoading] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  const showPDF = async (_file) => {
    setFile(_file);
    setLoading(true);
    try {
      const { data } = await FileService.get(_file.key);
      setUrl(data.result);
      setOpenPDF(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async ({ file_name, key }) => {
    setLoading(true);
    try {
      const { data } = await FileService.get(key);
      downloadMedia(file_name, data.result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = (key) => {
    removeItem(key, false, [], onClose);
  };

  return (
    <>
      <Modal
        title={`${folder?.folder_name} - ${folder?.files.length} items`}
        open={open}
        onClose={onClose}
        size="md"
      >
        <List sx={{ height: "100vh", overflow: "auto" }}>
          {folder?.files?.map(({ key, file_name, size, created_at }) => (
            <ListItem key={file_name} sx={{ mb: 2, boxShadow: 4 }}>
              <ListItemText
                primary={<Typography noWrap>{file_name}</Typography>}
                secondary={`${bytesToSize(size)} • ${beautyDateTime(created_at)}`}
              />
              <IconButton color="primary" onClick={() => showPDF({ key, file_name })}>
                {loading ? <CircularProgress /> : <PDFIcon />}
              </IconButton>
              <IconButton color="info" onClick={() => downloadPDF({ key, file_name })}>
                {loading ? <CircularProgress /> : <DownloadIcon />}
              </IconButton>
              <IconButton color="error" onClick={() => handleRemove(key)}>
                <RemoveIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Modal>

      <Modal title={file?.file_name} open={openPDF} onClose={() => setOpenPDF(false)} size="md">
        <PdfViewer pdfUrl={pdfUrl} />
      </Modal>
    </>
  );
};

export default FolderDetail;

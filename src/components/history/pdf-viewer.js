"use client";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { IconButton, Pagination, Paper, Stack, Tooltip } from "@mui/material";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Download } from "@mui/icons-material";
import { downloadMedia } from "src/utils";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PdfViewer = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const handlePageChange = (event, newPageNumber) => {
    setPageNumber(newPageNumber);
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" spacing={2} mb={2}>
        <Pagination
          count={numPages || 0}
          page={pageNumber}
          onChange={handlePageChange}
          color="primary"
          shape="rounded"
          variant="outlined"
          size="large"
          hidePrevButton
          hideNextButton
          sx={{ mb: 1 }}
        />
        <Tooltip title="Download PDF">
          <IconButton color="primary" onClick={() => downloadMedia("", pdfUrl)}>
            <Download />
          </IconButton>
        </Tooltip>
      </Stack>
      <Paper elevation={3} style={{ overflow: "auto" }}>
        <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess} wrap={true}>
          <Page pageNumber={pageNumber} />
        </Document>
      </Paper>
    </>
  );
};

export default PdfViewer;

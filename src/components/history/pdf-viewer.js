"use client";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Pagination, Paper } from "@mui/material";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

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
    <Paper elevation={3}>
      <Document file={pdfUrl}
onLoadSuccess={onDocumentLoadSuccess}
wrap={false}>
        <Pagination count={numPages || 0}
page={pageNumber}
onChange={handlePageChange} />
        <Page pageNumber={pageNumber} />
      </Document>
    </Paper>
  );
};

export default PdfViewer;
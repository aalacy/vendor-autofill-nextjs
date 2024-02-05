import { Box, Card, CardHeader, CardContent, Container } from "@mui/material";
import Head from "next/head";
import { PdfViewer } from "src/components/pdf-viewer";

import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

const ViewPDF = () => {
  return (
    <>
      <Head>
        <title>PDF View</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Container maxWidth="xl">
          <Card>
            <CardHeader title="View PDF"></CardHeader>
            <CardContent>
              <PdfViewer pdfUrl="/docs/MMI-API-Documentation-April-2023.pdf" />
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

ViewPDF.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ViewPDF;

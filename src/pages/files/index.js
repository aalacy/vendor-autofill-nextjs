import { Typography, Box, Container } from "@mui/material";
import Head from "next/head";

import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { FileManager } from "src/components/files/file-manager";

export const FilesPage = () => {
  return (
    <>
      <Head>
        <title>File Manager</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Container maxWidth="xl">
          <Typography component="h1"
variant="h5"
mb={5}>
            File Manager
          </Typography>
          <FileManager />
        </Container>
      </Box>
    </>
  );
};

FilesPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default FilesPage;

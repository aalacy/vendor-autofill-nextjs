import { useState } from "react";
import toast from "react-hot-toast";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  CircularProgress,
  Box,
  Card,
  CardContent,
  Container,
  Divider,
} from "@mui/material";
import Head from "next/head";

import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

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
          <Card>
            <CardContent>
              <Typography component="h1" variant="h5" mb={3}>
              File Manager
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

FilesPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default FilesPage;

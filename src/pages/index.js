import Head from "next/head";

import { Box, Container, Card, CardContent, Divider } from "@mui/material";
import { useState } from "react";

import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { VendorList } from "src/components/home/vendor-list";
import { JobInfo } from "src/components/home/job-info";
import { HeaderForm } from "src/components/home/header-form";

const Page = () => {
  const [open, setOpen] = useState(false);
  const [jobData, setJobData] = useState([]);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mb: 4,
        }}
      >
        <Container maxWidth="xl">
          <Card>
            <CardContent>
              <HeaderForm setOpen={setOpen} jobData={jobData} rowSelectionModel={rowSelectionModel} />
              <VendorList
                rowSelectionModel={rowSelectionModel}
                setRowSelectionModel={setRowSelectionModel}
              />
              <Divider sx={{ my: 3 }} />
              <JobInfo data={jobData} setData={setJobData} open={open} setOpen={setOpen} />
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

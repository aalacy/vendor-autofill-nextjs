import Head from "next/head";
import { Box, Container } from "@mui/material";
import { useEffect, useState } from "react";

import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { VendorList } from "src/components/home/vendor-list";
import { HeaderForm } from "src/components/home/header-form";
import { useAuth } from "src/hooks/use-auth";
import { JobFormModal } from "src/components/job-form/job-form-modal";

const Page = () => {
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [vendors, setVendors] = useState();
  const [selectedData, setSelectedData] = useState([]);

  const { job, showJobForm } = useAuth();

  useEffect(() => {
    if (!job) return;
    showJobForm(true);
  }, [job])

  return (
    <>
      <Head>
        <title>Vendor Forms</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Container maxWidth="xl">
          <HeaderForm
            rowSelectionModel={rowSelectionModel}
            setRowSelectionModel={setRowSelectionModel}
            selectedData={selectedData}
            setSelectedData={setSelectedData}
          />
          <VendorList
            vendors={vendors}
            setVendors={setVendors}
            rowSelectionModel={rowSelectionModel}
            setRowSelectionModel={setRowSelectionModel}
            selectedData={selectedData}
            setSelectedData={setSelectedData}
          />
        </Container>
      </Box>
      <JobFormModal
      />
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

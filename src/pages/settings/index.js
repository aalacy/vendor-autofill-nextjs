import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";

import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { JobFormModal } from "src/components/job-form/job-form-modal";
import { ManageUsers } from "src/components/settings/manage-users";
import { ManageVendors } from "src/components/settings/manage-vendors";
import TabComponent from "src/components/tab/tab-component";
import { ManageFaqs } from "src/components/settings/manage-faq";

const Page = () => {
  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Container maxWidth="xl">
          <Typography component="h1" variant="h5" marginBottom={5}>
            Settings
          </Typography>
          <TabComponent
            nodes={[
              {
                title: <Typography variant="h6">Users</Typography>,
                node: <ManageUsers />,
              },
              {
                title: <Typography variant="h6">Vendors</Typography>,
                node: <ManageVendors />,
              },
              {
                title: <Typography variant="h6">Faqs</Typography>,
                node: <ManageFaqs />,
              },
            ]}
          />
        </Container>
      </Box>
      <JobFormModal />
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";
import dynamic from "next/dynamic";

import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { ManageUsers } from "src/components/settings/manage-users";
import TabComponent from "src/components/tab/tab-component";

const ManageVendors = dynamic(() => import("src/components/settings/vendors/manage-vendors"), {
  ssr: false,
});
const ManageFaqs = dynamic(() => import("src/components/settings/manage-faq"), { ssr: false });

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
          <Typography variant="h5"
marginBottom={5}>
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
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

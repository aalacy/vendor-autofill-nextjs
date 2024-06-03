import Head from "next/head";
import { Box, Container } from "@mui/material";

import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { HomeMain } from "src/components/home/home-main";

const Page = () => {

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
          <HomeMain />
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

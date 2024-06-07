import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";

import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { FaqList } from "src/components/faqs/faq-list";

const Page = () => {
  return (
    <>
      <Head>
        <title>Faqs</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="h5"
marginBottom={10}>
            Faqs
          </Typography>
          <FaqList />
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

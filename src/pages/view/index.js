import { Box, Card, CardHeader, CardContent, Container } from "@mui/material";
import Head from "next/head";
import { useState } from "react";
import { HistoryList } from "src/components/history/history-list";

import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

const ViewPDF = () => {
    const [histories, setHistories] = useState();

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
            <CardHeader title="Requested Vendors"></CardHeader>
            <CardContent>
              <HistoryList 
                histories={histories}
                setHistories={setHistories}
              />
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

ViewPDF.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ViewPDF;

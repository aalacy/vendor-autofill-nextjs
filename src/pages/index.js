import Head from "next/head";
import { Box, Container, Card, CardContent, Divider } from "@mui/material";
import { useState } from "react";

import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { VendorList } from "src/components/home/vendor-list";
import { HeaderForm } from "src/components/home/header-form";

const Page = () => {
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [vendors, setVendors] = useState();
  const [selectedData, setSelectedData] = useState([]);

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
          <Card>
            <CardContent>
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
              <Divider sx={{ my: 3 }} />
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

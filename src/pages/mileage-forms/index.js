import { Button, Typography, Box, Container, Tooltip } from "@mui/material";
import Head from "next/head";
import { Add } from "@mui/icons-material";
import { useEffect, useState } from "react";

import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { MileageAddModal } from "src/components/mileage-forms/mileage-add-modal";
import { MileageList } from "src/components/mileage-forms/mileage-list";

export const MileageFormsPage = () => {
  const [open, setOpen] = useState(false);
  const [mileage, setMileage] = useState();
  const [mileages, setMileages] = useState();

  const handleEdit = (id) => {
    setMileage(mileages.items.find((item) => item.id === id));
    setOpen(true);
  };

  useEffect(() => {
    if (open) return;
    setMileage(null);
  }, [open]);

  return (
    <>
      <Head>
        <title>Mileage Forms</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 5 }}
          >
            <Typography component="h1" variant="h5">
              Mileage Forms
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Tooltip title="Add New Form">
                <Button
                  size="small"
                  onClick={() => setOpen(true)}
                  startIcon={<Add />}
                  variant="contained"
                >
                  Add
                </Button>
              </Tooltip>
            </Box>
          </Box>
          <MileageList mileages={mileages} setMileages={setMileages} handleEdit={handleEdit} />
        </Container>
        { open ? <MileageAddModal open={true} setOpen={setOpen} mileage={mileage} /> : null }
      </Box>
    </>
  );
};

MileageFormsPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default MileageFormsPage;

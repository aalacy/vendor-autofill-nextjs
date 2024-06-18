import { Button, Typography, Box, Container, Tooltip } from "@mui/material";
import Head from "next/head";
import { Add } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";

import { MileageList } from "src/components/mileage-forms/mileage-list";
import { GuestLayout } from "src/layouts/guest/layout";
import { useIndentifier } from "src/hooks/use-identifier";
import { initialPage } from "src/utils";
import { MileageService } from "src/services";
const MileageAddModal = dynamic(() => import("src/components/mileage-forms/mileage-add-modal"), {
  ssr: false,
});

export const MileageFormsPage = () => {
  const [open, setOpen] = useState(false);
  const [mileage, setMileage] = useState();
  const [paginationModel, setPaginationModel] = useState(initialPage);
  const [filterModel, setFilterModel] = useState({});
  const [rowCountState, setRowCountState] = useState(0);
  const [logicOperator, setLogicOperator] = useState("");

  const identifier = useIndentifier();

  const handleEdit = (id) => {
    setMileage(mileages.items.find((item) => item.id === id));
    setOpen(true);
  };

  const { isLoading, data: mileages } = useQuery({
    queryKey: ["getAllMileages", paginationModel, filterModel, logicOperator, identifier],
    queryFn: async () => {
      if (!identifier) return;

      const { data } = await MileageService.all(
        paginationModel,
        filterModel,
        logicOperator,
        identifier,
      );
      setRowCountState(data.result.total_count);
      return data.result;
    },
  });

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
            <Typography variant="h5">Mileage Forms</Typography>
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
          <MileageList
            loading={isLoading}
            mileages={mileages}
            handleEdit={handleEdit}
            rowCountState={rowCountState}
            setRowCountState={setRowCountState}
            filterModel={filterModel}
            setFilterModel={setFilterModel}
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
            setLogicOperator={setLogicOperator}
          />
        </Container>
        {open ? <MileageAddModal open={true} setOpen={setOpen} mileage={mileage} /> : null}
      </Box>
    </>
  );
};

MileageFormsPage.getLayout = (page) => <GuestLayout>{page}</GuestLayout>;

export default MileageFormsPage;

import { Typography, Stack, Paper, Grid } from "@mui/material";
import toast from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";

import { VendorService } from "src/services";
import { EDataGrid } from "src/components/e-datagrid";
import { VendorsColumns } from "src/columns";
import { initialPage } from "src/utils";

const DetailPanelContent = ({ row }) => {
  return (
    <Stack sx={{ py: 1, height: "100%", boxSizing: "border-box" }} direction="column">
      <Paper sx={{ flex: 1, mx: "auto", width: "90%", p: 1 }}>
        <Stack direction="column" spacing={1} sx={{ height: 1 }}>
          <Grid container>
            <Grid item md={6}>
              <Typography variant="h6" color="textSecondary" mb={2}>
                Vendor Information
              </Typography>
              <Typography variant="body1">
                <b>Phone:</b>&nbsp;{row.phone}
              </Typography>
              <Typography variant="body1">
                <b>Address:</b>&nbsp;{row.address}
              </Typography>
            </Grid>
          </Grid>
        </Stack>
      </Paper>
    </Stack>
  );
};

export const VendorList = ({ setRowSelectionModel, rowSelectionModel, vendors, setVendors }) => {
  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState(initialPage);
  const [filterModel, setFilterModel] = useState([]);
  const [rowCountState, setRowCountState] = useState(0);

  const getDetailPanelContent = useCallback(({ row }) => <DetailPanelContent row={row} />, []);
  const getDetailPanelHeight = useCallback(() => 200, []);

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await VendorService.all();
      setVendors(data.result);
      setRowCountState(data.result.total_count);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Typography variant="h6" mb={2}>
        Vendors
      </Typography>
      <EDataGrid
        loading={loading}
        data={vendors?.items}
        columns={VendorsColumns()}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
        rowCountState={rowCountState}
        setRowCountState={setRowCountState}
        filterModel={filterModel}
        setFilterModel={setFilterModel}
        rowSelectionModel={rowSelectionModel}
        setRowSelectionModel={setRowSelectionModel}
        rowThreshold={0}
        getDetailPanelHeight={getDetailPanelHeight}
        getDetailPanelContent={getDetailPanelContent}
      />
    </>
  );
};

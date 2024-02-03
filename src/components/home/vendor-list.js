import { Typography, Stack, Paper, Grid, Box } from "@mui/material";
import toast from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";

import { VendorService } from "src/services";
import { EDataGrid } from "src/components/e-datagrid";
import { VendorsColumns } from "src/columns";
import { initialPage, updateList } from "src/utils";
import { ClientDataGrid } from "../client-datagrid";

const DetailPanelContent = ({ row }) => {
  return (
    <Stack sx={{ py: 1, height: "100%", boxSizing: "border-box" }} direction="column">
      <Paper sx={{ flex: 1, flexWrap: "wrap", mx: "auto", width: "90%", p: 1 }}>
        <Stack direction="column" flexWrap="wrap" spacing={1} sx={{ height: 1 }}>
          <Grid container>
            <Grid item md={6} sm={12}>
              <Typography variant="h6" color="textSecondary" mb={2}>
                Vendor Information
              </Typography>
              <Typography variant="body1">
                <b>Email:</b>&nbsp;{row.email}
              </Typography>
              <Typography variant="body1">
                <b>Phone:</b>&nbsp;{row.phone}
              </Typography>
              <Typography variant="body1">
                <b>Address:</b>&nbsp;{row.address}
              </Typography>
              <Typography variant="body1">
                <b>Website:</b>&nbsp;{row.website}
              </Typography>
              <Typography variant="body1">
                <b>Category:</b>&nbsp;{row.category}
              </Typography>
            </Grid>
            <Grid item md={6}  sm={12}>
              <Typography variant="body1">
                <b>Hours:</b>
                <Box ml={3}><pre>{row.hours}</pre></Box>
              </Typography>
            </Grid>
          </Grid>
        </Stack>
      </Paper>
    </Stack>
  );
};

export const VendorList = ({
  setRowSelectionModel,
  rowSelectionModel,
  vendors,
  setVendors,
  selectedData,
  setSelectedData,
}) => {
  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState(initialPage);
  const [filterModel, setFilterModel] = useState([]);
  const [rowCountState, setRowCountState] = useState(0);
  const [logicOperator, setLogicOperator] = useState("");

  const getDetailPanelContent = useCallback(({ row }) => <DetailPanelContent row={row} />, []);

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await VendorService.all(paginationModel, filterModel, logicOperator);
      setVendors(data.result);
      setRowCountState(data.result.total_count);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [paginationModel, filterModel, logicOperator]);

  useEffect(() => {
    getData();
  }, [paginationModel, filterModel, logicOperator]);

  const handleCellValueChange = (params) => {
    const newRow = {
      id: params.id,
      [params.field]: params.value
    }
    setSelectedData(updateList(selectedData, newRow))
  };

  return (
    <>
      <Typography variant="h6" mb={2}>
        Vendors
      </Typography>
      <div style={{ height: 400, width: '100%' }}>
        {/* <EDataGrid
          loading={loading}
          data={vendors?.items}
          columns={VendorsColumns({handleCellValueChange})}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
          rowCountState={rowCountState}
          setRowCountState={setRowCountState}
          filterModel={filterModel}
          setFilterModel={setFilterModel}
          rowThreshold={0}
          rowSelectionModel={rowSelectionModel}
          setRowSelectionModel={setRowSelectionModel}
          getDetailPanelContent={getDetailPanelContent}
          setLogicOperator={setLogicOperator}
        /> */}
        <ClientDataGrid
          loading={loading}
          data={vendors?.items || []}
          columns={VendorsColumns({handleCellValueChange})}
          getDetailPanelContent={getDetailPanelContent}
          rowSelectionModel={rowSelectionModel}
          setRowSelectionModel={setRowSelectionModel}
        />
      </div>
    </>
  );
};

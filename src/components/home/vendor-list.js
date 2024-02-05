import { Typography, Stack, Paper, Grid, Box, IconButton, Tooltip } from "@mui/material";
import { GridToolbarContainer, GridToolbarQuickFilter } from "@mui/x-data-grid-pro";
import { Refresh as RefreshIcon } from "@mui/icons-material";
import toast from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";

import { VendorService } from "src/services";
import { VendorsColumns } from "src/columns";
import { updateList } from "src/utils";
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
            <Grid item md={6} sm={12}>
              <Typography variant="body1">
                <b>Hours:</b>
                <pre>{row.hours}</pre>
              </Typography>
            </Grid>
          </Grid>
        </Stack>
      </Paper>
    </Stack>
  );
};

const ReportRenderToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
};

const Footer = () => <></>;

export const VendorList = ({
  setRowSelectionModel,
  rowSelectionModel,
  vendors,
  setVendors,
  selectedData,
  setSelectedData,
}) => {
  const [loading, setLoading] = useState(false);
  const [pdfCount, setPDFCount] = useState(0);

  const getDetailPanelContent = useCallback(({ row }) => <DetailPanelContent row={row} />, []);

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await VendorService.all();
      setVendors(data.result);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getData();
  }, []);

  const countPDFs = (selected) => {
    let total = 0;
    for (const { credit_auth, rental_agreement } of selected) {
      if (credit_auth) total++;
      if (rental_agreement) total++;
    }

    setPDFCount(total);
  }

  const handleCellValueChange = (params) => {
    const newRow = {
      id: params.id,
      [params.field]: params.value,
    };
    const selected = updateList(selectedData, newRow)
    setSelectedData(selected);
    countPDFs(selected)
  };

  const handleClear = () => {
    setSelectedData([]);
  };
  
  // Get the total number of pdfs
  useEffect(() => {
    
  }, [selectedData])

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="h6" mb={2}>
          Vendors: &nbsp;(<small>{vendors?.items?.length}</small>)
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography>
            {pdfCount} <b>PDFs</b>
          </Typography>
          {/* <Tooltip title="Clear">
            <IconButton onClick={handleClear} color="primary" size="small">
              <RefreshIcon />
            </IconButton>
          </Tooltip> */}
        </Box>
      </Box>
      <div style={{ height: 400, width: "100%" }}>
        <ClientDataGrid
          loading={loading}
          data={vendors?.items || []}
          columns={VendorsColumns({ handleCellValueChange })}
          getDetailPanelContent={getDetailPanelContent}
          rowSelectionModel={rowSelectionModel}
          setRowSelectionModel={setRowSelectionModel}
          toolbar={ReportRenderToolbar}
          slots={{
            footer: Footer,
          }}
        />
      </div>
    </>
  );
};

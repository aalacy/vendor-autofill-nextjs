import { Typography, Box, IconButton, Tooltip } from "@mui/material";
import { GridToolbarContainer, GridToolbarQuickFilter } from "@mui/x-data-grid-pro";
import { Refresh as RefreshIcon } from "@mui/icons-material";
import toast from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";

import { VendorService } from "src/services";
import { VendorsColumns } from "src/columns";
import { updateList } from "src/utils";
import { ClientDataGrid } from "../tables/client-datagrid";
import { VendorDetailPanelContent } from "./vendor-detail";

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

  const getDetailPanelContent = useCallback(({ row }) => <VendorDetailPanelContent row={row} />, []);

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
  };

  const handleCellValueChange = (params) => {
    const newRow = {
      id: params.id,
      [params.field]: params.value,
    };
    const selected = updateList(selectedData, newRow);
    setSelectedData(selected);
    countPDFs(selected);
  };

  const handleClear = () => {
    setSelectedData([]);
  };

  // Get the total number of pdfs
  useEffect(() => {
    countPDFs(selectedData);
  }, [selectedData]);

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="h6" mb={2}>
          Vendors: &nbsp;(<small>{vendors?.items?.length || "-"}</small>)
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography>
            {pdfCount} <b>PDFs</b>
          </Typography>
          <Tooltip title="Clear">
            <IconButton onClick={handleClear} color="primary" size="small">
              <RefreshIcon />
            </IconButton>
          </Tooltip>
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

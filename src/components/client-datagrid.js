import { DataGridPro, GridToolbarContainer, GridToolbarQuickFilter } from "@mui/x-data-grid-pro";

import { TableSkeleton } from "./table-skeleton"; 
import CustomNoRowsOverlay from "./custom-no-rows";
import { useCallback, useState } from "react";

const ReportRenderToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
};

export const ClientDataGrid = (props) => {
  const { loading, data, columns, hasPagination, getDetailPanelContent, rowSelectionModel, setRowSelectionModel } = props;

  const [detailPanelExpandedRowIds, setDetailPanelExpandedRowIds] = useState([]);
  
  const getDetailPanelHeight = useCallback(() => 'auto', []);
  const handleDetailPanelExpandedRowIdsChange = useCallback(
    (newIds) => {
      setDetailPanelExpandedRowIds(
        newIds.length > 1 ? [newIds[newIds.length - 1]] : newIds,
      );
    },
    [],
  );

  return (
    <DataGridPro
      checkboxSelection
      disableColumnFilter
      disableColumnSelector
      disableDensitySelector
      loading={loading}
      pagination={hasPagination}
      rows={data}
      initialState={{
        pagination: { paginationModel: { pageSize: 5 } },
      }}
      pageSizeOptions={[5]}
      getDetailPanelHeight={getDetailPanelHeight}
      getDetailPanelContent={getDetailPanelContent}
      detailPanelExpandedRowIds={detailPanelExpandedRowIds}
      onDetailPanelExpandedRowIdsChange={handleDetailPanelExpandedRowIdsChange}
      onRowSelectionModelChange={(newRowSelectionModel) => {
        setRowSelectionModel(newRowSelectionModel);
      }}
      rowSelectionModel={rowSelectionModel}
      rowThreshold={0} 
      columnBuffer={2} 
      columnThreshold={2}
      columns={columns}
      slots={{
        noRowsOverlay: CustomNoRowsOverlay,
        noResultsOverlay: CustomNoRowsOverlay,
        loadingOverlay: TableSkeleton,
        toolbar: ReportRenderToolbar
      }}
      slotProps={{
        toolbar: {
          showQuickFilter: true,
        },
      }}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
      }
      sx={{
        boxShadow: 1,
        borderColor: 'primary.light',
        '& .MuiDataGrid-cell:hover': {
          color: 'primary.main',
        },
        padding: 1
      }}
    />
  );
};

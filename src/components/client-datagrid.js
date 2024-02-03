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
  const { data, columns, hasPagination, getDetailPanelContent } = props;

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
      pagination={hasPagination}
      disableColumnFilter
      disableColumnSelector
      disableDensitySelector
      disableRowSelectionOnClick
      rows={data}
      initialState={{
        pagination: { paginationModel: { pageSize: 5 } },
      }}
      pageSizeOptions={[5]}
      getDetailPanelHeight={getDetailPanelHeight}
      getDetailPanelContent={getDetailPanelContent}
      detailPanelExpandedRowIds={detailPanelExpandedRowIds}
      onDetailPanelExpandedRowIdsChange={handleDetailPanelExpandedRowIdsChange}
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
    />
  );
};

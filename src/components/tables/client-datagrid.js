import { useCallback, useState } from "react";

import { TableSkeleton } from "../skeleton/table-skeleton";
import CustomNoRowsOverlay from "./custom-no-rows";
import { StripedDataGrid } from "./styled-grid";

export const ClientDataGrid = (props) => {
  const {
    loading,
    data,
    columns,
    hasPagination,
    getDetailPanelContent,
    rowSelectionModel,
    setRowSelectionModel,
    toolbar,
    slots,
    onStateChange,
  } = props;

  const [detailPanelExpandedRowIds, setDetailPanelExpandedRowIds] = useState([]);

  const getDetailPanelHeight = useCallback(() => "auto", []);
  const handleDetailPanelExpandedRowIdsChange = useCallback((newIds) => {
    setDetailPanelExpandedRowIds(newIds.length > 1 ? [newIds[newIds.length - 1]] : newIds);
  }, []);

  return (
    <StripedDataGrid
      disableColumnFilter
      disableColumnSelector
      disableDensitySelector
      loading={loading}
      pagination={hasPagination}
      rows={data || []}
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
      onStateChange={onStateChange}
      slots={{
        ...slots,
        noRowsOverlay: CustomNoRowsOverlay,
        noResultsOverlay: CustomNoRowsOverlay,
        loadingOverlay: TableSkeleton,
        toolbar,
      }}
      slotProps={{
        toolbar: {
          showQuickFilter: true,
        },
      }}
      getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd")}
      sx={{
        boxShadow: 1,
        borderColor: "primary.light",
        "& .MuiDataGrid-cell:hover": {
          color: "primary.main",
        },
        padding: 1,
      }}
    />
  );
};

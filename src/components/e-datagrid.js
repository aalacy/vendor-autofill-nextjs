import { useCallback, useEffect } from "react";
import {
  DataGridPro,
} from "@mui/x-data-grid-pro";
import { toast } from "react-hot-toast";

import { TableSkeleton } from "./table-skeleton";
import CustomNoRowsOverlay from "./custom-no-rows";

export const EDataGrid = (props) => {
  const {
    data,
    rowCountState,
    columns,
    setFilterModel,
    paginationModel,
    setPaginationModel,
    rowSelectionModel,
    setRowSelectionModel,
    pageSizeOptions,
    promiseArguments,
    setPromiseArguments,
    handleOk,
    loading,
    hideHeader,
    hideCheckbox,
    setLogicOperator,
    rowThreshold,
    getDetailPanelHeight,
    getDetailPanelContent
  } = props;

  const computeMutation = (newRow, oldRow) => {
    let ret = null;
    Object.keys(newRow).forEach((key) => {
      if (newRow[key] !== oldRow[key]) ret = key;
    });
    return ret;
  };

  const processRowUpdate = useCallback(
    (newRow, oldRow) =>
      new Promise<GridRowModel>((resolve, reject) => {
        const mutation = computeMutation(newRow, oldRow);
        if (mutation) {
          // Save the arguments to resolve or reject the promise later
          setPromiseArguments({ resolve, reject, newRow, oldRow, mutation });
        } else {
          resolve(oldRow); // Nothing was changed
        }
      }),
    [],
  );

  const handleProcessRowUpdateError = useCallback((error) => {
    toast.error(error.message);
  }, []);

  const onFilterChange = useCallback((filterModel) => {
    // Here you save the data you need from the filter model
    setLogicOperator(filterModel.logicOperator);
    setFilterModel(filterModel.items);
  }, []);

  useEffect(() => {
    if (!promiseArguments) return;
    handleOk();
  }, [promiseArguments]);

  return (
    <DataGridPro
      checkboxSelection={!hideCheckbox}
      disableRowSelectionOnClick={!!!rowSelectionModel}
      autoHeight
      keepNonExistentRowsSelected
      rowCount={rowCountState}
      rows={data || []}
      columns={columns}
      rowHeight={(data || []).length > 0 ? 52 : 155}
      columnHeaderHeight={hideHeader ? 0 : 56}
      loading={loading}
      filterMode="server"
      onFilterModelChange={onFilterChange}
      pagination
      pageSizeOptions={pageSizeOptions || [5]}
      paginationModel={paginationModel}
      paginationMode="server"
      onPaginationModelChange={setPaginationModel}
      onRowSelectionModelChange={(newRowSelectionModel) => {
        setRowSelectionModel(newRowSelectionModel);
      }}
      rowSelectionModel={rowSelectionModel}
      rowThreshold={rowThreshold}
      getDetailPanelHeight={getDetailPanelHeight}
      getDetailPanelContent={getDetailPanelContent}
      slots={{
        noRowsOverlay: CustomNoRowsOverlay,
        noResultsOverlay: CustomNoRowsOverlay,
        loadingOverlay: TableSkeleton,
      }}
      processRowUpdate={processRowUpdate}
      onProcessRowUpdateError={handleProcessRowUpdateError}
      sx={{
        "& .MuiDataGrid-columnHeaders": {
          borderBottom: hideHeader ? "inherit" : "2px solid #A6A6A6 !important",
        },
        "& .MuiDataGrid-columnHeaders .MuiDataGrid-columnHeaderTitle": {
          color: "#A6A6A6",
          fontWeight: 700,
        },
        width: "100%",
        minHeight: 300,
        flex: 1,
      }}
    />
  );
};

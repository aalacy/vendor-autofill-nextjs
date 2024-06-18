import { useCallback, useEffect, useState } from "react";
import {
  DataGridPro,
  GridColumnMenuContainer,
  GridColumnMenuFilterItem,
  GridColumnMenuSortItem,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  gridClasses,
} from "@mui/x-data-grid-pro";
import { toast } from "react-hot-toast";

import { TableSkeleton } from "../skeleton/table-skeleton";
import CustomNoRowsOverlay from "./custom-no-rows";
import { useAuth } from "src/hooks/use-auth";
import { StripedDataGrid } from "./styled-grid";

export function CustomColumnMenuComponent(props) {
  const { hideMenu, colDef, ...other } = props;

  return (
    <GridColumnMenuContainer hideMenu={hideMenu} colDef={colDef} {...other}>
      <GridColumnMenuSortItem onClick={hideMenu} colDef={colDef} />
      <GridColumnMenuFilterItem onClick={hideMenu} colDef={colDef} />
    </GridColumnMenuContainer>
  );
}

const ReportRenderToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarQuickFilter debounceMs={200} />
    </GridToolbarContainer>
  );
};

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
    handleNo,
    noConfirm,
    loading,
    hideHeader,
    hideCheckbox,
    setLogicOperator,
    rowThreshold,
    getDetailPanelContent,
    enableClipboardCopy,
    initialState,
    showQuickFilter,
  } = props;

  const { showConfirmDlg } = useAuth();
  const [detailPanelExpandedRowIds, setDetailPanelExpandedRowIds] = useState([]);

  const getDetailPanelHeight = useCallback(() => "auto", []);
  const handleDetailPanelExpandedRowIdsChange = useCallback((newIds) => {
    setDetailPanelExpandedRowIds(newIds.length > 1 ? [newIds[newIds.length - 1]] : newIds);
  }, []);

  const computeMutation = (newRow, oldRow) => {
    let ret = null;
    Object.keys(newRow).forEach((key) => {
      if (newRow[key] !== oldRow[key]) ret = key;
    });
    return ret;
  };

  const processRowUpdate = useCallback(
    (newRow, oldRow) =>
      new Promise((resolve, reject) => {
        const mutation = computeMutation(newRow, oldRow);
        if (mutation) {
          // Save the arguments to resolve or reject the promise later
          setPromiseArguments({ resolve, reject, newRow, oldRow, mutation });
        } else {
          resolve(oldRow); // Nothing was changed
        }
      }),
    [setPromiseArguments],
  );

  const handleProcessRowUpdateError = useCallback((error) => {
    toast.error(error.message);
  }, []);

  const onFilterChange = useCallback(
    (filterModel) => {
      // Here you save the data you need from the filter model
      setLogicOperator("or");
      setFilterModel(filterModel);
    },
    [setFilterModel, setLogicOperator],
  );

  const handleCellClick = useCallback(
    (params, event) => {
      const { field, row } = params;
      if (["department", "id"].includes(field)) return;
      let value = row[field];
      if (field === "phone_email") {
        value = `phone: ${row["phone"]}, email: ${row["email"]}`;
      } else if (field === "name_position") {
        value = `name: ${row["first_name"]} ${row["last_name"]}, position: ${row["position"]}`;
      }
      if (value && enableClipboardCopy) {
        navigator.clipboard.writeText(value);
        toast.success(`Copied: ${value}`);
      }
    },
    [enableClipboardCopy],
  );

  useEffect(() => {
    if (!promiseArguments) return;
    if (noConfirm) handleOk();
    else
      showConfirmDlg({
        open: true,
        close: handleNo,
        callback: handleOk,
      });
  }, [promiseArguments, handleNo, handleOk, noConfirm, showConfirmDlg]);

  return (
    <StripedDataGrid
      autoHeight
      keepNonExistentRowsSelected
      initialState={initialState}
      checkboxSelection={!hideCheckbox}
      disableRowSelectionOnClick={!!!rowSelectionModel}
      rowCount={rowCountState}
      rows={data || []}
      columns={columns}
      rowHeight={(data || []).length > 0 ? 52 : 155}
      columnHeaderHeight={hideHeader ? 0 : 56}
      loading={loading}
      filterMode="server"
      onFilterModelChange={onFilterChange}
      columnBuffer={2}
      columnThreshold={2}
      pagination
      pageSizeOptions={pageSizeOptions || [5]}
      paginationModel={paginationModel}
      paginationMode="server"
      onPaginationModelChange={setPaginationModel}
      onRowSelectionModelChange={(newRowSelectionModel) => {
        setRowSelectionModel(newRowSelectionModel);
      }}
      onCellClick={handleCellClick}
      rowSelectionModel={rowSelectionModel}
      rowThreshold={rowThreshold}
      getDetailPanelHeight={getDetailPanelHeight}
      getDetailPanelContent={getDetailPanelContent}
      detailPanelExpandedRowIds={detailPanelExpandedRowIds}
      onDetailPanelExpandedRowIdsChange={handleDetailPanelExpandedRowIdsChange}
      slots={{
        noRowsOverlay: CustomNoRowsOverlay,
        noResultsOverlay: CustomNoRowsOverlay,
        loadingOverlay: TableSkeleton,
        columnMenu: CustomColumnMenuComponent,
        toolbar: ReportRenderToolbar,
      }}
      slotProps={{
        toolbar: {
          showQuickFilter: true,
        },
      }}
      getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd")}
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

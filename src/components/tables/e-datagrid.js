import { useCallback, useEffect } from "react";
import {
  DataGridPro,
  GridColumnMenuContainer,
  GridColumnMenuFilterItem,
  GridColumnMenuSortItem,
  gridClasses,
} from "@mui/x-data-grid-pro";
import { alpha, styled } from '@mui/material/styles';
import { toast } from "react-hot-toast";

import { TableSkeleton } from "../skeleton/table-skeleton";
import CustomNoRowsOverlay from "./custom-no-rows";
import { useAuth } from "src/hooks/use-auth";

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGridPro)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[800],
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity,
      ),
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  },
}));

export function CustomColumnMenuComponent(props) {
  const { hideMenu, colDef,  ...other } = props;

    return (
      <GridColumnMenuContainer
        hideMenu={hideMenu}
        colDef={colDef}
        {...other}
      >
        <GridColumnMenuSortItem onClick={hideMenu} colDef={colDef} />
        <GridColumnMenuFilterItem onClick={hideMenu} colDef={colDef} />
      </GridColumnMenuContainer>
    );
    }

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
    enableClipboardCopy
  } = props;

  const { showConfirmDlg } = useAuth()

  const getDetailPanelHeight = useCallback(() => 'auto', []);

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

  const handleCellClick = useCallback((params, event) => {
    const { field, row } = params;
    if (['department', 'id'].includes(field)) return;
    let value = row[field];
    if (field === "phone_email") {
      value = `phone: ${row['phone']}, email: ${row['email']}`
    } else if (field === "name_position") {
      value = `name: ${row['first_name']} ${row['last_name']}, position: ${row['position']}`
    }
    if (value && enableClipboardCopy) {
      navigator.clipboard.writeText(value);
      toast.success(`Copied: ${value}`)
    }
  }, [])

  useEffect(() => {
    if (!promiseArguments) return;
    if (noConfirm) handleOk();
    else
      showConfirmDlg({
        open: true,
        close: handleNo,
        callback: handleOk,
      });
  }, [promiseArguments]);

  return (
    <StripedDataGrid
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
      slots={{
        noRowsOverlay: CustomNoRowsOverlay,
        noResultsOverlay: CustomNoRowsOverlay,
        loadingOverlay: TableSkeleton,
        columnMenu: CustomColumnMenuComponent,
      }}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
      }
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

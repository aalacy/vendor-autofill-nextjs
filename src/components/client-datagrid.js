import { DataGridPro } from "@mui/x-data-grid-pro";

import { TableSkeleton } from "./table-skeleton"; 
import CustomNoRowsOverlay from "./custom-no-rows";

export const ClientDataGrid = (props) => {
  const { data, columns} = props;

  return (
    <DataGridPro
      pagination
      autoHeight
      disableRowSelectionOnClick
      rows={data}
      initialState={{
        pagination: { paginationModel: { pageSize: 5 } },
      }}
      pageSizeOptions={[5]}
      columns={columns}
      slots={{
        noRowsOverlay: CustomNoRowsOverlay,
        noResultsOverlay: CustomNoRowsOverlay,
        loadingOverlay: TableSkeleton,
      }}
    />
  );
};

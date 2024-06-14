import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import dynamic from "next/dynamic";

import { PrimitiveVendorsColumns } from "src/columns";
const VendorDetailPanelContent = dynamic(() => import("../../home/vendor-detail"), { ssr: false });
import { VendorService } from "src/services";
import { initialPage } from "src/utils";
import { EDataGrid } from "src/components/tables/e-datagrid";

export const PendingVendors = ({
  handleEdit,
  handleRemove,
  handleAdd,
  handleOpenPDF,
  handleConvert,
}) => {
  const [paginationModel, setPaginationModel] = useState(initialPage);
  const [filterModel, setFilterModel] = useState({});
  const [rowCountState, setRowCountState] = useState(0);
  const [logicOperator, setLogicOperator] = useState("");

  const getDetailPanelContent = useCallback(
    ({ row }) => <VendorDetailPanelContent row={row} />,
    [],
  );

  const { isLoading, data: vendors } = useQuery({
    queryKey: ["getAdminVendors", paginationModel, filterModel, logicOperator],
    queryFn: async () => {
      const {
        data: { result },
      } = await VendorService.allByPage(paginationModel, filterModel, logicOperator, false);
      setRowCountState((prevRowCountState) => result.total_count || prevRowCountState);
      return result.items;
    },
  });

  return (
    <EDataGrid
      hideCheckbox
      showQuickFilter
      initialState={{ pinnedColumns: { right: ["id"] } }}
      loading={isLoading}
      data={vendors}
      columns={PrimitiveVendorsColumns({
        handleEdit,
        handleRemove,
        handleAdd,
        handleOpenPDF,
        handleConvert,
      })}
      paginationModel={paginationModel}
      setPaginationModel={setPaginationModel}
      rowCountState={rowCountState}
      setRowCountState={setRowCountState}
      filterModel={filterModel}
      setFilterModel={setFilterModel}
      setLogicOperator={setLogicOperator}
      getDetailPanelContent={getDetailPanelContent}
    />
  );
};

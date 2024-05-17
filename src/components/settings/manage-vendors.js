import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";

import { VendorService } from "src/services";
import { EDataGrid } from "../tables/e-datagrid";
import { initialPage } from "src/utils";
import { PrimitiveVendorsColumns } from "src/columns";
import { VendorDetailPanelContent } from "../home/vendor-detail";
import { UpdateVendor } from "./update-vendor";

export const ManageVendors = () => {
  const [paginationModel, setPaginationModel] = useState(initialPage);
  const [filterModel, setFilterModel] = useState([]);
  const [rowCountState, setRowCountState] = useState(0);
  const [logicOperator, setLogicOperator] = useState("");
  const [curVendor, setVendor] = useState();
  const [open, setOpen] = useState(false);

  const getDetailPanelContent = useCallback(
    ({ row }) => <VendorDetailPanelContent row={row} />,
    []
  );

  const { isLoading, data: vendors } = useQuery({
    queryKey: ["getAllVendors", paginationModel, filterModel, logicOperator],
    queryFn: async () => {
      const {
        data: { result },
      } = await VendorService.allByPage(paginationModel, filterModel, logicOperator);
      setRowCountState((prevRowCountState) => result.total_count || prevRowCountState);
      return result.items;
    },
  });

  const handleEdit = (vendor) => {
    setVendor(vendor);
    setOpen(true);
  };

  return (
    <>
      <EDataGrid
        hideCheckbox
        initialState={{ pinnedColumns: { right: ["id"] } }}
        loading={isLoading}
        data={vendors}
        columns={PrimitiveVendorsColumns({ handleEdit })}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
        rowCountState={rowCountState}
        setRowCountState={setRowCountState}
        filterModel={filterModel}
        setFilterModel={setFilterModel}
        setLogicOperator={setLogicOperator}
        getDetailPanelContent={getDetailPanelContent}
      />

      {open && <UpdateVendor open={true} onClose={() => setOpen(false)} vendor={curVendor} />}
    </>
  );
};

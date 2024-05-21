import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

import { VendorService } from "src/services";
import { EDataGrid } from "../tables/e-datagrid";
import { initialPage } from "src/utils";
import { PrimitiveVendorsColumns } from "src/columns";
import { VendorDetailPanelContent } from "../home/vendor-detail";
import { UpdateVendor } from "./update-vendor";
import { useAuth } from "src/hooks/use-auth";
import { VendorForm } from "../home/vendor-form";

export const ManageVendors = () => {
  const [paginationModel, setPaginationModel] = useState(initialPage);
  const [filterModel, setFilterModel] = useState([]);
  const [rowCountState, setRowCountState] = useState(0);
  const [logicOperator, setLogicOperator] = useState("");
  const [curVendor, setVendor] = useState();
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  const queryClient = useQueryClient();

  const { showConfirmDlg, hideConfirm } = useAuth();

  const getDetailPanelContent = useCallback(
    ({ row }) => <VendorDetailPanelContent row={row} />,
    []
  );

  const { isLoading, data: vendors } = useQuery({
    queryKey: ["getAdminVendors", paginationModel, filterModel, logicOperator],
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

  const handleRemove = async (vendor) => {
    showConfirmDlg({
      open: true,
      close: hideConfirm,
      callback: async () => {
        try {
          await VendorService.removeVendor(vendor.id);
          toast.success("Successfully Deleted");
          queryClient.invalidateQueries({ queryKey: ["getAdminVendors"] });
        } catch (error) {
          toast.error(error?.response?.data?.message || error.message);
        } finally {
          hideConfirm();
        }
      },
    });
  };

  const handleAdd = useCallback(() => {
    setShow(true);
  }, []);

  return (
    <>
      <EDataGrid
        hideCheckbox
        initialState={{ pinnedColumns: { right: ["id"] } }}
        loading={isLoading}
        data={vendors}
        columns={PrimitiveVendorsColumns({ handleEdit, handleRemove, handleAdd })}
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

      {show && <VendorForm noThankYou show={true} setShow={setShow} />}
    </>
  );
};

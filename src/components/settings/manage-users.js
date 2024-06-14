import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

import { UserService } from "src/services";
import { EDataGrid } from "../tables/e-datagrid";
import { UserColumns } from "src/columns/user-columns";
import { initialPage } from "src/utils";
import { UpdateUser } from "./update-user";
import { useAuth } from "src/hooks/use-auth";

export const ManageUsers = () => {
  const [paginationModel, setPaginationModel] = useState(initialPage);
  const [filterModel, setFilterModel] = useState({});
  const [rowCountState, setRowCountState] = useState(0);
  const [logicOperator, setLogicOperator] = useState("or");
  const [curUser, setUser] = useState();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { showConfirmDlg, hideConfirm } = useAuth();

  const { isLoading, data: users } = useQuery({
    queryKey: ["getAllUsers", paginationModel, filterModel, logicOperator],
    queryFn: async () => {
      const {
        data: { result },
      } = await UserService.all(paginationModel, filterModel, logicOperator);
      setRowCountState((prevRowCountState) => result.total_count || prevRowCountState);
      return result.items;
    },
  });

  const { data: roles } = useQuery({
    queryKey: ["getAllRoles"],
    queryFn: async () => {
      const {
        data: { result },
      } = await UserService.getAllRoles();
      return result;
    },
  });

  const handleEdit = (user) => {
    setUser(user);
    setOpen(true);
  };

  const handleRemove = async (vendor) => {
    showConfirmDlg({
      open: true,
      close: hideConfirm,
      callback: async () => {
        try {
          await UserService.removeUser(vendor.id);
          toast.success("Successfully Deleted");
          queryClient.invalidateQueries({ queryKey: ["getAllUsers"] });
        } catch (error) {
          toast.error(error?.response?.data || error.message);
        } finally {
          hideConfirm();
        }
      },
    });
  };

  return (
    <>
      <EDataGrid
        hideCheckbox
        initialState={{ pinnedColumns: { right: ["id"] } }}
        loading={isLoading}
        data={users}
        columns={UserColumns({ handleEdit, handleRemove })}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
        rowCountState={rowCountState}
        setRowCountState={setRowCountState}
        filterModel={filterModel}
        setFilterModel={setFilterModel}
        setLogicOperator={setLogicOperator}
      />

      {open && (
        <UpdateUser roles={roles} open={true} onClose={() => setOpen(false)} user={curUser} />
      )}
    </>
  );
};

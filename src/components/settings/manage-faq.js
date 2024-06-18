import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

import { FaqColumns } from "src/columns";
import { FaqService } from "src/services";
import { FaqFormModal } from "../faqs/faq-form-modal";
import { EDataGrid } from "../tables/e-datagrid";
import { useAuth } from "src/hooks/use-auth";

const ManageFaqs = () => {
  const [open, setOpen] = useState(false);
  const [curFaq, setFaq] = useState();
  const [logicOperator, setLogicOperator] = useState("or");
  const [filterModel, setFilterModel] = useState({});
  const { showConfirmDlg, hideConfirm } = useAuth();

  const queryClient = useQueryClient();

  const { isLoading, data } = useQuery({
    queryKey: ["getAllFaqs", filterModel, logicOperator],
    queryFn: async () => {
      const {
        data: { result },
      } = await FaqService.all(filterModel, logicOperator);
      return result;
    },
  });

  const handleRemove = (id) => {
    showConfirmDlg({
      open: true,
      close: hideConfirm,
      callback: async () => {
        try {
          await FaqService.remove(id);
          toast.success("Successfully Deleted");
          queryClient.invalidateQueries({ queryKey: ["getAllFaqs"] });
        } catch (error) {
          toast.error(error?.response?.data || error.message);
        } finally {
          hideConfirm();
        }
      },
    });
  };

  const handleEdit = (row) => {
    setFaq(row);
    setOpen(true);
  };

  const handleAdd = () => {
    setFaq(null);
    setOpen(true);
  };

  return (
    <>
      <div style={{ height: 550, width: "100%" }}>
        <EDataGrid
          hideCheckbox
          initialState={{ pinnedColumns: { right: ["id"] } }}
          loading={isLoading}
          data={data || []}
          columns={FaqColumns({ handleRemove, handleEdit, handleAdd })}
          filterModel={filterModel}
          setFilterModel={setFilterModel}
          setLogicOperator={setLogicOperator}
        />
      </div>
      {open && <FaqFormModal curFaq={curFaq}
open={true}
setOpen={setOpen} />}
    </>
  );
};

export default ManageFaqs;

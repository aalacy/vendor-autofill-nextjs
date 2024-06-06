import toast from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";

import { EDataGrid } from "src/components/tables/e-datagrid";
import { ContactService } from "src/services";
import { initialPage } from "src/utils";
import { ContactsColumns } from "src/columns";
import { useAuth } from "src/hooks/use-auth";

export const ContactList = ({ contacts, setContacts, handleEdit }) => {
  const { showConfirmDlg, hideConfirm, shouldRefresh, refresh } = useAuth();

  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState(initialPage);
  const [filterModel, setFilterModel] = useState([]);
  const [rowCountState, setRowCountState] = useState(0);
  const [logicOperator, setLogicOperator] = useState("");
  const [promiseArguments, setPromiseArguments] = useState(null);

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await ContactService.all(paginationModel, filterModel, logicOperator);
      setContacts(data.result);
      setRowCountState(data.result.total_count);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [paginationModel, filterModel, logicOperator, setContacts]);

  useEffect(() => {
    getData();
  }, [paginationModel, filterModel, logicOperator, shouldRefresh]);

  const removeContact = async (id) => {
    try {
      await ContactService.delete(id);
      toast.success("Successfully removed");
    } catch (err) {
      toast.error(Array.isArray(err.response?.data) ? err.message : err.response?.data);
    }
    hideConfirm();
    refresh();
  };

  const handleRemove = (id) => {
    showConfirmDlg({
      open: true,
      close: hideConfirm,
      callback: () => removeContact(id),
    });
  };

  const handleOk = async () => {
    showConfirmDlg({ open: false });

    const { newRow, oldRow, mutation, resolve } = promiseArguments;
    try {
      let data = { [mutation]: newRow[mutation] };
      await ContactService.update(newRow.id, data);
      toast.success("Successfully done.");
      resolve(newRow);
      setPromiseArguments(null);
    } catch (err) {
      toast.error(err.response?.data || err.message);
      resolve(oldRow);
      setPromiseArguments(null);
    }
  };

  const handleNo = () => {
    if (promiseArguments) {
      const { oldRow, resolve } = promiseArguments;
      resolve(oldRow); // Resolve with the old row to not update the internal state
      setPromiseArguments(null);
    }
    showConfirmDlg({ open: false });
  };

  return (
    <EDataGrid
      hideCheckbox
      enableClipboardCopy
      loading={loading}
      data={contacts?.items}
      columns={ContactsColumns({ handleRemove, handleEdit })}
      paginationModel={paginationModel}
      setPaginationModel={setPaginationModel}
      rowCountState={rowCountState}
      setRowCountState={setRowCountState}
      filterModel={filterModel}
      setFilterModel={setFilterModel}
      setLogicOperator={setLogicOperator}
      promiseArguments={promiseArguments}
      setPromiseArguments={setPromiseArguments}
      handleOk={handleOk}
      handleNo={handleNo}
    />
  );
};

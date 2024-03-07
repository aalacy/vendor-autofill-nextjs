import { TablePagination } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { FileSearch } from "./file-search";
import { FileService } from "src/services";
import { FileList } from "./file-list";
import { useAuth } from "src/hooks/use-auth";

export const FileManager = ({}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [alignment, setAlignment] = useState("card");
  const [sortby, setSortby] = useState("Latest");
  const [total, setTotal] = useState(0);

  const { showConfirmDlg, hideConfirm } = useAuth();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await FileService.all(query, page, rowsPerPage, sortby);
      const { items, count } = data.result;
      setFolders(items);
      setTotal(count);
    } catch (error) {
      toast.error(error.message || error.response.data);
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage, query, sortby]);

  const removeItem = (key) => {
    showConfirmDlg({
      open: true,
      close: hideConfirm,
      callback: () => {
        showConfirmDlg({ open: false });
        try {
          FileService.remove(key);
          toast.success("Successfully deleted");
        } catch (error) {
          toast.error(error.message);
        }
      },
    });
  };

  useEffect(() => {
    getData();
  }, [page, rowsPerPage, sortby]);

  return (
    <>
      <FileSearch
        alignment={alignment}
        setAlignment={setAlignment}
        sortby={sortby}
        setSortby={setSortby}
        query={query}
        setQuery={setQuery}
        getData={getData}
      />

      <FileList folders={folders} loading={loading} alignment={alignment} removeItem={removeItem} />

      <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

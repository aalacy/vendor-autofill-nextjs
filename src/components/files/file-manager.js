import { TablePagination } from "@mui/material";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { FileSearch } from "./file-search";
import { FileService } from "src/services";
import { FileList } from "./file-list";
import { useAuth } from "src/hooks/use-auth";
import { downloadMedia } from "src/utils";

export const FileManager = ({}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [alignment, setAlignment] = useState("card");
  const [sortby, setSortby] = useState("Latest");
  const [total, setTotal] = useState(0);

  const { showConfirmDlg, hideConfirm, project } = useAuth();

  const queryClient = useQueryClient();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const { isLoading, data: folders } = useQuery({
    queryKey: ["getAllFiles", query, page, rowsPerPage, sortby, project?.id],
    queryFn: async () => {
      const {
        data: {
          result: { items, count },
        },
      } = await FileService.all(query, page, rowsPerPage, sortby, project?.id);
      setTotal(count);
      return items;
    },
  });

  const downloadFiles = useCallback(async (folders) => {
    setLoading(true);
    const keys = folders.map(({ files }) => files.map((key) => key.key));
    try {
      const {
        data: { result },
      } = await FileService.download(keys.flat());
      for (const item of result) {
        downloadMedia("", item);
      }
    } catch (error) {
      toast.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const removeItem = (key, cb) => {
    showConfirmDlg({
      open: true,
      close: hideConfirm,
      callback: () => {
        showConfirmDlg({ open: false });
        try {
          FileService.remove(key);
          toast.success("Successfully deleted");
          queryClient.invalidateQueries({ queryKey: ["getAllFiles"] });
          if (cb) cb();
        } catch (error) {
          toast.error(err.response?.data || err.message);
        }
      },
    });
  };

  return (
    <>
      <FileSearch
        alignment={alignment}
        setAlignment={setAlignment}
        sortby={sortby}
        setSortby={setSortby}
        query={query}
        setQuery={setQuery}
        downloadFiles={downloadFiles}
        folders={folders}
      />

      <FileList
        downloadFiles={downloadFiles}
        folders={folders}
        loading={loading || isLoading}
        alignment={alignment}
        removeItem={removeItem}
      />

      <TablePagination
        component="div"
        count={total || 0}
        page={page || 0}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

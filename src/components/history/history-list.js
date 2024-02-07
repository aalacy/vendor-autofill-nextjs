import toast from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";

import { HistoryService } from "src/services";
import { EDataGrid } from "src/components/e-datagrid";
import { initialPage } from "src/utils";
import { HistoryColumns } from "src/columns/history-columns";
import { Modal } from "../modal";
import { PdfViewer } from "../pdf-viewer";

export const HistoryList = ({ histories, setHistories }) => {
  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState(initialPage);
  const [filterModel, setFilterModel] = useState([]);
  const [rowCountState, setRowCountState] = useState(0);
  const [logicOperator, setLogicOperator] = useState("");
  const [open, setOpen] = useState(false);
  const [pdfUrl, setUrl] = useState("");
  const [vendor, setVendor] = useState();

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await HistoryService.all(paginationModel, filterModel, logicOperator);
      setHistories(data.result);
      setRowCountState(data.result.total_count);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [paginationModel, filterModel, logicOperator]);

  useEffect(() => {
    getData();
  }, [paginationModel, filterModel, logicOperator]);

  const handleView = (url, item) => {
    setUrl(url);
    setVendor(item);
    console.log('item', item)
    setOpen(true);
  };

  return (
    <>
      {/* <Typography variant="h6" mb={2}>
        Histories
      </Typography> */}
      <EDataGrid
        loading={loading}
        data={histories?.items}
        columns={HistoryColumns({ handleView })}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
        rowCountState={rowCountState}
        setRowCountState={setRowCountState}
        filterModel={filterModel}
        setFilterModel={setFilterModel}
        setLogicOperator={setLogicOperator}
      />

      <Modal
        title={`${vendor?.vendor?.name} - ${vendor?.type || ""}`}
        open={open}
        onClose={() => setOpen(false)}
        size="md"
      >
        <PdfViewer pdfUrl={pdfUrl} />
      </Modal>
    </>
  );
};

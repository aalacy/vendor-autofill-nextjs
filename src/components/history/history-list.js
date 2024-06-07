import toast from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";

import { HistoryService } from "src/services";
import { EDataGrid } from "src/components/tables/e-datagrid";
import { initialPage } from "src/utils";
import { HistoryColumns } from "src/columns/history-columns";
import { Modal } from "../common/modal";
import dynamic from "next/dynamic";
const PdfViewer = dynamic(() => import("./pdf-viewer"), { ssr: false });

export const HistoryList = ({ histories, setHistories }) => {
  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState(initialPage);
  const [filterModel, setFilterModel] = useState([]);
  const [rowCountState, setRowCountState] = useState(0);
  const [logicOperator, setLogicOperator] = useState("");
  const [open, setOpen] = useState(false);
  const [pdfUrl, setUrl] = useState("");
  const [vendor, setVendor] = useState("");
  const [type, setType] = useState("");

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
  }, [paginationModel, filterModel, logicOperator, setHistories]);

  useEffect(() => {
    getData();
  }, [paginationModel, filterModel, logicOperator, getData]);

  const handleView = (url, item, type) => {
    setUrl(url);
    setVendor(item);
    setType(type);
    setOpen(true);
  };

  return (
    <>
      <EDataGrid
        hideCheckbox
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
        title={`${vendor?.vendor?.name} - ${type || ""}`}
        open={open}
        onClose={() => setOpen(false)}
        size="md"
      >
        <PdfViewer pdfUrl={pdfUrl} />
      </Modal>
    </>
  );
};

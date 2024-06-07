import toast from "react-hot-toast";
import { useCallback, useState } from "react";

import { EDataGrid } from "src/components/tables/e-datagrid";
import { MileageService } from "src/services";
import { downloadMedia } from "src/utils";
import { MileagesColumns } from "src/columns";
import { useAuth } from "src/hooks/use-auth";
import { MileageDetailContent } from "./mileage-detail";
import { Modal } from "../common/modal";
import dynamic from 'next/dynamic';
const PdfViewer = dynamic(() => import("../history/pdf-viewer"), {ssr: false});

export const MileageList = ({
  mileages,
  loading,
  rowCountState,
  setFilterModel,
  setPaginationModel,
  setLogicOperator,
  handleEdit,
  setRowCountState,
  filterModel,
  paginationModel,
}) => {
  const { showConfirmDlg, hideConfirm } = useAuth();

  const [promiseArguments, setPromiseArguments] = useState(null);
  const [pdfUrl, setUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [mileage, setMileage] = useState();
  const [loadingGet, setLoadingGet] = useState(false);

  const getDetailPanelContent = useCallback(({ row }) => <MileageDetailContent row={row} />, []);

  const removeMileage = async (id) => {
    try {
      await MileageService.delete(id);
      toast.success("Successfully removed");
    } catch (err) {
      toast.error(Array.isArray(err.response?.data) ? err.message : err.response?.data);
    }
    hideConfirm();
  };

  const handleRemove = (id) => {
    showConfirmDlg({
      open: true,
      close: hideConfirm,
      callback: () => removeMileage(id),
    });
  };

  const handleView = async (item) => {
    setMileage(item);
    setLoadingGet(true);
    try {
      const { data } = await MileageService.get(item.id);
      setUrl(data.result);
      setOpen(true);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingGet(false);
    }
  };

  const handleDownload = async (item) => {
    setMileage(item);
    setLoadingGet(true);
    try {
      const { data } = await MileageService.get(item.id);
      downloadMedia(item.name, data.result);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingGet(false);
    }
  };

  const handleOk = async () => {
    showConfirmDlg({ open: false });

    const { newRow, oldRow, mutation, resolve } = promiseArguments;
    try {
      let data = { [mutation]: newRow[mutation] };
      await MileageService.update(newRow.id, data);
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
    <>
      <EDataGrid
        hideCheckbox
        initialState={{ pinnedColumns: { right: ["id"] } }}
        loading={loading}
        data={mileages?.items}
        columns={MileagesColumns({
          handleRemove,
          handleEdit,
          handleView,
          handleDownload,
          loadingGet,
        })}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
        rowCountState={rowCountState}
        setRowCountState={setRowCountState}
        filterModel={filterModel}
        setFilterModel={setFilterModel}
        setLogicOperator={setLogicOperator}
        promiseArguments={promiseArguments}
        setPromiseArguments={setPromiseArguments}
        getDetailPanelContent={getDetailPanelContent}
        handleOk={handleOk}
        handleNo={handleNo}
      />

      <Modal title={`${mileage?.name}`}
open={open}
onClose={() => setOpen(false)}
size="md">
        <PdfViewer pdfUrl={pdfUrl} />
      </Modal>
    </>
  );
};

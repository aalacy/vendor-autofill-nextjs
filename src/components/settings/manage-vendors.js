import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

import { VendorService } from "src/services";
import { EDataGrid } from "../tables/e-datagrid";
import { initialPage } from "src/utils";
import { PrimitiveVendorsColumns } from "src/columns";
import { VendorDetailPanelContent } from "../home/vendor-detail";
import { useAuth } from "src/hooks/use-auth";
import { VendorForm1 } from "../home/vendor-form1";
import { Modal } from "../common/modal";
import { PdfViewer } from "../history/pdf-viewer";
import LoadingOverlay from "../common/loading-overlay";

export const ManageVendors = () => {
  const [paginationModel, setPaginationModel] = useState(initialPage);
  const [filterModel, setFilterModel] = useState([]);
  const [rowCountState, setRowCountState] = useState(0);
  const [logicOperator, setLogicOperator] = useState("");
  const [curVendor, setVendor] = useState();
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [showPDFModal, setShowPDFModal] = useState(false);
  const [pdfUrl, setUrl] = useState("");
  const [gLoading, setGLoading] = useState(false);

  const queryClient = useQueryClient();

  const { showConfirmDlg, hideConfirm } = useAuth();

  const getDetailPanelContent = useCallback(
    ({ row }) => <VendorDetailPanelContent row={row} />,
    [],
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
    setShow(true);
  };

  const handleRemove = useCallback(
    async (vendor) => {
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
    },
    [showConfirmDlg, hideConfirm, queryClient],
  );

  const handleAdd = useCallback(() => {
    setShow(true);
  }, []);

  const handleOpenPDF = useCallback(
    async (vendor, form) => {
      setTitle(`${vendor.name} - ${form?.title}`);
      try {
        const {
          data: { result },
        } = await VendorService.readPDF(form.template_key);
        setShowPDFModal(true);
        setUrl(result);
      } catch (error) {
        console.log("handleCOI", error);
      } finally {
        setGLoading(false);
      }
    },
    [setTitle, setShowPDFModal, setUrl, setGLoading],
  );

  return (
    <>
      <EDataGrid
        hideCheckbox
        initialState={{ pinnedColumns: { right: ["id"] } }}
        loading={isLoading}
        data={vendors}
        columns={PrimitiveVendorsColumns({ handleEdit, handleRemove, handleAdd, handleOpenPDF })}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
        rowCountState={rowCountState}
        setRowCountState={setRowCountState}
        filterModel={filterModel}
        setFilterModel={setFilterModel}
        setLogicOperator={setLogicOperator}
        getDetailPanelContent={getDetailPanelContent}
      />

      {show && <VendorForm1 noThankYou vendor={curVendor} show={true} setShow={setShow} />}

      <Modal title={title} open={showPDFModal} onClose={() => setShowPDFModal(false)}>
        <PdfViewer pdfUrl={pdfUrl} />
      </Modal>

      <LoadingOverlay setOpen={setGLoading} open={gLoading} />
    </>
  );
};

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";

import { VendorService } from "src/services";
import { useAuth } from "src/hooks/use-auth";
import { Modal } from "../../common/modal";
import LoadingOverlay from "../../common/loading-overlay";
const PdfViewer = dynamic(() => import("../../history/pdf-viewer"), { ssr: false });

const VendorForm1 = dynamic(() => import("../../home/vendor-form1"), { ssr: false });
import TabComponent from "src/components/tab/tab-component";
import { LiveVendors } from "./live-vendors";
import { PendingVendors } from "./pending-vendors";
import { Paper, Typography } from "@mui/material";

const ManageVendors = () => {
  const [curVendor, setVendor] = useState();
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [showPDFModal, setShowPDFModal] = useState(false);
  const [pdfUrl, setUrl] = useState("");
  const [gLoading, setGLoading] = useState(false);

  const queryClient = useQueryClient();

  const { showConfirmDlg, hideConfirm } = useAuth();

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
            toast.error(error?.response?.data || error.message);
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

  const handleConvert = useCallback(
    async (vendor) => {
      showConfirmDlg({
        open: true,
        close: hideConfirm,
        callback: async () => {
          try {
            const {
              data: { result },
            } = await VendorService.convertVendor(vendor.id);
            queryClient.invalidateQueries({ queryKey: ["getAdminVendors"] });
            toast.success(result);
          } catch (error) {
            toast.error(error?.response?.data || error.message);
          } finally {
            hideConfirm();
          }
        },
      });
    },
    [showConfirmDlg, hideConfirm, queryClient],
  );

  return (
    <>
      <Paper>
        <TabComponent
          nodes={[
            {
              title: <Typography variant="h6">Live</Typography>,
              node: (
                <LiveVendors
                  handleEdit={handleEdit}
                  handleRemove={handleRemove}
                  handleAdd={handleAdd}
                  handleOpenPDF={handleOpenPDF}
                  handleConvert={handleConvert}
                />
              ),
            },
            {
              title: <Typography variant="h6">Pending</Typography>,
              node: (
                <PendingVendors
                  handleEdit={handleEdit}
                  handleRemove={handleRemove}
                  handleAdd={handleAdd}
                  handleOpenPDF={handleOpenPDF}
                  handleConvert={handleConvert}
                />
              ),
            },
          ]}
        />
      </Paper>

      {show && <VendorForm1 noThankYou vendor={curVendor} show={true} setShow={setShow} />}

      {showPDFModal && (
        <Modal title={title} open={true} onClose={() => setShowPDFModal(false)}>
          <PdfViewer pdfUrl={pdfUrl} />
        </Modal>
      )}

      <LoadingOverlay setOpen={setGLoading} open={gLoading} />
    </>
  );
};

export default ManageVendors;

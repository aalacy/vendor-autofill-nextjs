import toast from "react-hot-toast";
import { useCallback, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { VendorService } from "src/services";
import { useAuth } from "src/hooks/use-auth";
import { FileInput } from "src/components/widgets/file-input";
import { Modal } from "src/components/common/modal";
import LoadingOverlay from "src/components/common/loading-overlay";
import { COIRequestForm } from "./coi-request-form";

const ManageCOI = ({ title, myVendor, open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [gLoading, setGLoading] = useState(false);

  const { project } = useAuth();

  const queryClient = useQueryClient();

  const onClose = () => setOpen(false);

  const onUpload = async () => {
    if (!files || files?.length < 1) return;
    setFiles([]);
    setLoading(true);
    try {
      await VendorService.uploadCOI(
        myVendor.id,
        myVendor.vendor.name,
        myVendor.coi_id,
        project?.id,
        files[0],
      );
      toast.success("Successfully uploaded.");
      queryClient.invalidateQueries({ queryKey: ["getAllVendors", project?.id] });
    } catch (err) {
      toast.error(err?.response?.data || err.message);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  const handleSubmit = useCallback(
    async (email) => {
      const {
        data: { detail },
      } = await VendorService.sendEmailForCOI(myVendor.id, email);
    },
    [myVendor],
  );

  return (
    <>
      {open && (
        <Modal open={true} onClose={onClose} title={title} size="sm">
          <COIRequestForm setGLoading={setGLoading} callback={handleSubmit} />
          <FileInput
            canUpload
            files={files}
            setFiles={setFiles}
            maxFileLimit={1}
            onUpload={onUpload}
            loading={loading}
          />
        </Modal>
      )}
      <LoadingOverlay setOpen={setGLoading} open={gLoading} />
    </>
  );
};

export default ManageCOI;

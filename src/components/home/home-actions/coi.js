import toast from "react-hot-toast";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { VendorService } from "src/services";
import { useAuth } from "src/hooks/use-auth";
import { FileInput } from "src/components/widgets/file-input";
import { Modal } from "src/components/common/modal";

export const ManageCOI = ({ title, myVendor, open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);

  const { project } = useAuth();

  const queryClient = useQueryClient();

  const onClose = () => setOpen(false);

  const uploadedFile = (event) => {};

  const onUpload = async () => {
    if (!files || files?.length < 1) return;
    setFiles([]);
    setLoading(true);
    try {
      await VendorService.uploadCOI(
        myVendor.id,
        myVendor.vendor.name,
        project?.id,
        files[0],
        uploadedFile,
      );
      toast.success("Successfully uploaded.");
      queryClient.invalidateQueries({ queryKey: ["getAllVendors", project.id] });
    } catch (err) {
      console.log("err", err);
      const { message } = err?.response?.data;
      const submit = Array.isArray(message) ? err.message : message;
      toast.error(submit);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <>
      {open && (
        <Modal open={true} onClose={onClose} title={title} size="sm">
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
    </>
  );
};

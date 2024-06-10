import toast from "react-hot-toast";
import { useState } from "react";

import { VendorService } from "src/services";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "src/hooks/use-auth";
import { FileInput } from "src/components/widgets/file-input";
import { Modal } from "src/components/common/modal";

export const ManageInvoice = ({
  title,
  subTitle,
  myVendor,
  open,
  setOpen,
  maxFileLimit,
  replaceInvoice,
  showReplace
}) => {
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
      const {
        data: { result },
      } = await VendorService.uploadInvoices(
        myVendor.id,
        myVendor.vendor.name,
        project?.id,
        files,
        uploadedFile,
      );
      toast.success("Successfully uploaded.");
      queryClient.invalidateQueries({ queryKey: ["getAllVendors", project.id] });
      if (showReplace) {
        await replaceInvoice(result[0]);
      }
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
        <Modal open={true} onClose={onClose} title={title} subTitle={subTitle} size="sm">
          <FileInput
            canUpload
            files={files}
            setFiles={setFiles}
            maxFileLimit={maxFileLimit}
            onUpload={onUpload}
            loading={loading}
          />
        </Modal>
      )}
    </>
  );
};

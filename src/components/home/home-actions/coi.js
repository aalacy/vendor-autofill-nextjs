import toast from "react-hot-toast";
import { useCallback, useState } from "react";

import { FileDropzone } from "src/components/account/file-dropzone";
import { Modal } from "src/components/common/modal";
import { VendorService } from "src/services";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "src/hooks/use-auth";

export const ManageCOI = ({ title, vendor, open, setOpen, refreshData }) => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);

  const { project } = useAuth();

  const queryClient = useQueryClient();

  const onClose = () => setOpen(false);

  const uploadedFile = (event) => {};

  const handleDrop = (newFiles, fileRejections) => {
    setFiles(() => [...newFiles]);
    if (fileRejections.length) {
      const { errors } = fileRejections[0];
      let message = errors[0].message;
      if (errors[0].code === ErrorCode.TooManyFiles) {
        message = `Cannot upload more than ${maxFileLimit} file(s)`;
      }
      toast.error(message);
    }
  };

  const handleRemove = (file) => {
    setFiles((prevFiles) => prevFiles.filter((_file) => _file.path !== file.path));
  };

  const handleRemoveAll = () => {
    setFiles([]);
  };

  const onUpload = async () => {
    if (!files || files?.length < 1) return;
    setFiles([]);
    setLoading(true);
    try {
      await VendorService.uploadCOI(vendor.id, vendor.name, project?.id, files[0], uploadedFile);
      toast.success("Successfully uploaded.");
      queryClient.invalidateQueries({ queryKey: ["getAllVendors"] });
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
          <FileDropzone
            maxFiles={1}
            accept={{ "application/pdf": [".pdf"] }}
            files={files}
            onDrop={handleDrop}
            onRemove={handleRemove}
            onRemoveAll={handleRemoveAll}
            onUpload={onUpload}
            type="PDF"
            loading={loading}
          />
        </Modal>
      )}
    </>
  );
};

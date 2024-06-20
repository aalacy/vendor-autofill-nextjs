import toast from "react-hot-toast";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { VendorService } from "src/services";
import { useAuth } from "src/hooks/use-auth";
import { FileInput } from "src/components/widgets/file-input";
import { Modal } from "src/components/common/modal";

const ManageInvoice = ({ title, subTitle, myVendor, open, maxFileLimit, onClose, invoice }) => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);

  const { project } = useAuth();

  const queryClient = useQueryClient();

  const onUpload = async () => {
    if (!files || files?.length < 1) return;
    setFiles([]);
    setLoading(true);
    try {
      const {
        data: { detail },
      } = await VendorService.replaceInvoice(
        myVendor.vendor.name,
        project?.id,
        invoice.id,
        files[0],
      );
      toast.success(detail);
      queryClient.invalidateQueries({ queryKey: ["getAllVendors", project?.id] });
    } catch (err) {
      toast.error(err?.response?.data || err.message);
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

export default ManageInvoice;

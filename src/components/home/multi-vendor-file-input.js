import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@mui/material";

import { VendorService } from "src/services";
import { FileInput } from "../widgets/file-input";

export const MultiVendorFileInput = ({ name, setFieldValue, values, value }) => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [template_key, setTemplateKey] = useState(value);

  const onUpload = async () => {
    if (!files || files?.length < 1) return;
    setFiles([]);
    setLoading(true);
    try {
      const {
        data: { result },
      } = await VendorService.uploadFormPDF(values.name, files[0]);
      console.log(result);
      setTemplateKey(result);
      setFieldValue(name, result);
    } catch (err) {
      console.log("err", err);
      const { message } = err?.response?.data;
      const submit = Array.isArray(message) ? err.message : message;
      toast.error(submit);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const {
        data: { detail },
      } = await VendorService.deleteFormPdf(template_key);
      setTemplateKey("");
      toast.success(detail);
    } catch (err) {
      console.log("err", err);
      const { message } = err?.response?.data;
      const submit = Array.isArray(message) ? err.message : message;
      toast.error(submit);
    } finally {
      setLoading(false);
    }
  };

  const canUpload = useMemo(() => {
    return values?.name?.length > 0;
  }, [values?.name]);

  return (
    <FileInput
      setFiles={setFiles}
      files={files}
      maxFileLimit={1}
      onUpload={onUpload}
      loading={loading}
      canUpload={canUpload}
      name={name}
      disabled={!!template_key}
    >
      {template_key ? (
        <Button onClick={handleDelete} variant="outlined" color="error">
          Remove File
        </Button>
      ) : null}
    </FileInput>
  );
};

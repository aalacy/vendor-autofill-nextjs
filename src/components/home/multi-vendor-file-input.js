import { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Box, Button, IconButton, Stack, Tooltip, Typography } from "@mui/material";

import { VendorService } from "src/services";
import { FileInputField } from "../widgets/file-input-field";
import { useAuth } from "src/hooks/use-auth";
import { Download } from "@mui/icons-material";
import { downloadMedia } from "src/utils";

export const MultiVendorFileInput = ({
  label,
  vendor_name,
  name,
  setFieldValue,
  value,
  error,
  disabled,
  showDownload,
  ...rest
}) => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [template_key, setTemplateKey] = useState(value);

  const { project } = useAuth();

  const onUpload = async () => {
    if (!files || files?.length < 1) return;
    setFiles([]);
    setLoading(true);
    try {
      const {
        data: { result },
      } = await VendorService.uploadFormPDF(vendor_name, project?.id, files[0]);
      setTemplateKey(result);
      setFieldValue(name, result);
    } catch (err) {
      toast.error(err?.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const {
        data: { detail },
      } = await VendorService.deletePdf(template_key);
      setTemplateKey("");
      toast.success(detail);
    } catch (err) {
      const { message } = err?.response?.data;
      const submit = Array.isArray(message) ? err.message : message;
      toast.error(submit);
    } finally {
      setLoading(false);
    }
  };

  const canUpload = useMemo(() => {
    return vendor_name?.length > 0;
  }, [vendor_name]);

  const downloadFile = useCallback(async () => {
    try {
      const {
        data: { result },
      } = await VendorService.readPDF(value);
      downloadMedia("", result);
    } catch (error) {
      toast.error(err.response?.data || err.message);
    }
  }, [value]);

  return (
    <Box {...rest}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {label && <Typography variant="subtitle2">{label}</Typography>}
        {showDownload && value && (
          <Tooltip title="Download File">
            <IconButton onClick={downloadFile} color="primary" sx={{ ml: "auto" }}>
              <Download />
            </IconButton>
          </Tooltip>
        )}
      </Stack>

      <FileInputField
        setFiles={setFiles}
        files={files}
        maxFileLimit={1}
        onUpload={onUpload}
        loading={loading}
        canUpload={canUpload}
        name={name}
        disabled={!!template_key || disabled}
        error={error}
      >
        {template_key ? (
          <Button onClick={handleDelete} variant="outlined" color="error">
            Remove File
          </Button>
        ) : null}
      </FileInputField>
    </Box>
  );
};

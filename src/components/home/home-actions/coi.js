import toast from "react-hot-toast";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as yup from "yup";
import { Box, Button, TextField, InputAdornment } from "@mui/material";
import { EmailOutlined as EmailIcon } from "@mui/icons-material";

import { VendorService } from "src/services";
import { useAuth } from "src/hooks/use-auth";
import { FileInput } from "src/components/widgets/file-input";
import { Modal } from "src/components/common/modal";
import LoadingOverlay from "src/components/common/loading-overlay";

const ManageCOI = ({ title, myVendor, open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [gLoading, setGLoading] = useState(false);

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
      queryClient.invalidateQueries({ queryKey: ["getAllVendors", project?.id] });
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

  const formik = useFormik({
    enableReinitialize: true,
    onSubmit: async (values) => {
      setGLoading(true);
      try {
        const {
          data: { detail },
        } = await VendorService.sendEmailForCOI(myVendor.id, values.email);
        toast.success(detail);
      } catch (err) {
        toast.error(err.response?.data || err.message);
      } finally {
        setGLoading(false);
      }
    },
    initialValues: {
      email: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().email("Invalid email!").required("Required"),
    }),
  });

  return (
    <>
      {open && (
        <Modal open={true} onClose={onClose} title={title} size="sm">
          <form onSubmit={formik.handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 2,
                mb: 2,
              }}
            >
              <TextField
                type="text"
                size="small"
                label="Email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                name="email"
                error={!!formik.touched.email && !!formik.errors.email}
                helperText={formik.touched.email && formik.errors.email}
                sx={{ gridColumn: "span 2" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Button type="submit" variant="contained">
                Send
              </Button>
            </Box>
          </form>
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

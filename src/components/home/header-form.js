import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { Email as EmailIcon } from "@mui/icons-material";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";

import { VendorService } from "src/services";
import { ThankYou } from "./thank-you";
import { useAuth } from "src/hooks/use-auth";
import { AlertJob } from "./alert-job";

export const HeaderForm = ({
  setSelectedData,
  selectedData,
}) => {
  const { job } = useAuth();

  const [openThankyou, setOpenThankyou] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openJobAlert, setOpenJobAlert] = useState(false);

  const onCloseThankyou = () => setOpenThankyou(false);

  const onSubmit = async (values) => {
    if (selectedData.length < 1) {
      return toast.error("Please select the vendors.");
    }
    if (!job) {
      return setOpenJobAlert(true);
    }
    try {
      setLoading(true);
      await VendorService.generatePDF(selectedData, values.email);
      setOpenThankyou(true);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const initialValues = {
    email: "",
  };

  const checkoutSchema = yup.object().shape({
    email: yup.string().email("Invalid email!").required("Required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    onSubmit,
    initialValues,
    validationSchema: checkoutSchema,
  });

  const clearForm = () => {
    formik.resetForm();
    setSelectedData([]);
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 2,
            mb: 5,
          }}
        >
          <Typography variant="h5">Vendor Forms</Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-start",
              justifyContent: "space-around",
              gap: 2,
            }}
          >
            {/* <Button onClick={() => setOpen(true)} variant="contained">
              Browse Job Info
            </Button> */}
            <TextField
              type="text"
              size="small"
              label="Email Address"
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
            <Button
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
              type="submit"
              variant="contained"
            >
              Generate
            </Button>
          </Box>
        </Box>
      </form>

      <ThankYou
        open={openThankyou}
        onClose={onCloseThankyou}
        email={formik.values?.email}
        clearForm={clearForm}
      />

      <AlertJob
        open={openJobAlert}
        onClose={() => setOpenJobAlert(false)}
      />
    </>
  );
};

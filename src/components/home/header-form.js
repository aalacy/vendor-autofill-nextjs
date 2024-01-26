import { Box, Button, TextField, Typography, InputAdornment } from "@mui/material";
import { Email as EmailIcon } from "@mui/icons-material";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as yup from "yup";

import { VendorService } from "src/services";

export const HeaderForm = ({ rowSelectionModel, jobData, setOpen}) => {
  const onSubmit = async (values) => {
    try {
      const ids = vendors.items.map((d) => d.id).filter((id) => rowSelectionModel.includes(id));
      await VendorService.generatePDF(ids, values.email, jobData);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const initialValues = {
    email: "",
  };

  const checkoutSchema = yup.object().shape({
    email: yup.string().email("Invalid email!").required("Required"),
  });

  const formik = useFormik({
    onSubmit,
    initialValues,
    validationSchema: checkoutSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: 2,
          mb: 3,
        }}
      >
        <Typography variant="h5">Auto Form</Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-start",
            justifyContent: "space-around",
            gap: 2,
          }}
        >
          <Button onClick={() => setOpen(true)} variant="contained">
            Browse Job Info
          </Button>
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
          <Button type="submit" variant="contained">
            Generate
          </Button>
        </Box>
      </Box>
    </form>
  );
};

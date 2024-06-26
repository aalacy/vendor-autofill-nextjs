import { useFormik } from "formik";
import * as Yup from "yup";
import "yup-phone-lite";
import { Box, Button, TextField, InputAdornment, useMediaQuery } from "@mui/material";
import { Phone as PhoneIcon, Mail as MailIcon } from "@mui/icons-material";
import toast from "react-hot-toast";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { useAuth } from "src/hooks/use-auth";
import { Modal } from "src/components/common/modal";
import { InputPhone } from "src/components/widgets/input-phone";
import { VendorService } from "src/services";
import { ThankYou } from "./thank-you";

export const VendorForm = ({ show, setShow, noThankYou }) => {
  const { showConfirmDlg, hideConfirm } = useAuth();
  const queryClient = useQueryClient();

  const isNonMobile = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  const [open, setOpen] = useState(false);

  const handleSubmit = async (values, helpers) => {
    hideConfirm();

    const { submit, ...other } = values;
    let submitData = { ...other };
    if (noThankYou) {
      submitData = { ...other, active: true, is_template: true };
    }
    try {
      const { data } = await VendorService.add(submitData);
      toast.success(data.detail);
      if (noThankYou) {
        queryClient.invalidateQueries({ queryKey: ["getAdminVendors"] });
      } else {
        setOpen(true);
      }
      setShow(false);
    } catch (err) {
      toast.error(err?.response?.data || err.message);
    }
  };

  const onSubmit = async (values, helpers) => {
    showConfirmDlg({
      open: true,
      close: hideConfirm,
      callback: () => handleSubmit(values, helpers),
    });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      address: "",
      name: "",
      phone: "",
      website: "",
      w9: "",
      hours: "",
      category: "",
      notes: "",
      submit: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      address: Yup.string().required("Required"),
      email: Yup.string().email("Must be a valid email").max(255).required("Required"),
      phone: Yup.string().phone("US", "Please enter a valid phone number").required("Required"),
    }),
    onSubmit,
  });

  const handleClose = () => {
    formik.resetForm();
    setShow(false);
  };

  return (
    <>
      <Modal size="sm" open={show} onClose={handleClose} title="Add Vendor">
        <form noValidate onSubmit={formik.handleSubmit}>
          <Box
            display="grid"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              gap: 2,
            }}
          >
            <TextField
              error={Boolean(formik.touched.name && formik.errors.name)}
              fullWidth
              helperText={formik.touched.name && formik.errors.name}
              label="Name*"
              margin="dense"
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              size="small"
              value={formik.values.name}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              error={Boolean(formik.touched.address && formik.errors.address)}
              fullWidth
              helperText={formik.touched.address && formik.errors.address}
              label="Address*"
              margin="dense"
              name="address"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              size="small"
              value={formik.values.address}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email*"
              margin="dense"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              size="small"
              value={formik.values.email}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <MailIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              error={Boolean(formik.touched.phone && formik.errors.phone)}
              fullWidth
              helperText={formik.touched.phone && formik.errors.phone}
              label="Phone*"
              margin="dense"
              name="phone"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              size="small"
              value={formik.values.phone}
              InputProps={{
                inputComponent: InputPhone,
                endAdornment: (
                  <InputAdornment position="end">
                    <PhoneIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              error={Boolean(formik.touched.w9 && formik.errors.w9)}
              fullWidth
              helperText={formik.touched.w9 && formik.errors.w9}
              label="W9"
              margin="dense"
              name="w9"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              size="small"
              value={formik.values.w9}
              sx={{ gridColumn: "span 2" }}
            />

            <TextField
              error={Boolean(formik.touched.website && formik.errors.website)}
              fullWidth
              helperText={formik.touched.website && formik.errors.website}
              label="Website"
              margin="dense"
              name="website"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              size="small"
              value={formik.values.website}
              sx={{ gridColumn: "span 2" }}
            />

            <TextField
              error={Boolean(formik.touched.category && formik.errors.category)}
              fullWidth
              helperText={formik.touched.category && formik.errors.category}
              label="Category"
              margin="dense"
              name="category"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              size="small"
              value={formik.values.category}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              multiline
              rows={2}
              maxRows={5}
              error={Boolean(formik.touched.hours && formik.errors.hours)}
              fullWidth
              helperText={formik.touched.hours && formik.errors.hours}
              label="Hours"
              margin="dense"
              name="hours"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              size="small"
              value={formik.values.hours}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              multiline
              rows={2}
              maxRows={5}
              error={Boolean(formik.touched.notes && formik.errors.notes)}
              fullWidth
              helperText={formik.touched.notes && formik.errors.notes}
              label="Notes"
              margin="dense"
              name="notes"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              size="small"
              value={formik.values.notes}
              sx={{ gridColumn: "span 2" }}
            />
          </Box>
          <Box sx={{ my: 2, textAlign: "center" }}>
            <Button type="submit" variant="contained" sx={{ mr: 2 }}>
              Submit
            </Button>
            <Button onClick={handleClose} variant="outlined">
              Cancel
            </Button>
          </Box>
        </form>
      </Modal>

      {open && !noThankYou && (
        <ThankYou
          open={true}
          onClose={() => setOpen(false)}
          text="Thanks for submitting, please wait 24 hours for your vendor to be added."
        />
      )}
    </>
  );
};

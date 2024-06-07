import { Formik, Form } from "formik";
import * as Yup from "yup";
import "yup-phone-lite";
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  useMediaQuery,
  CircularProgress,
  Stack,
} from "@mui/material";
import { Phone as PhoneIcon, Mail as MailIcon } from "@mui/icons-material";
import toast from "react-hot-toast";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { useAuth } from "src/hooks/use-auth";
import { Modal } from "src/components/common/modal";
import { InputPhone } from "src/components/widgets/input-phone";
import { VendorService } from "src/services";
import { ThankYou } from "./thank-you";
import { InputField } from "../widgets";
import { VendorMultiForm } from "./multi-form";

export const VendorForm1 = ({ show, setShow, noThankYou, vendor }) => {
  const { showConfirmDlg, hideConfirm } = useAuth();
  const queryClient = useQueryClient();

  const isNonMobile = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values, helpers) => {
    hideConfirm();
    setLoading(true);
    const { submit, ...other } = values;
    let submitData = { ...other };
    if (noThankYou) {
      submitData = { ...other, active: true, is_template: true };
    }
    try {
      if (vendor) {
        const {
          data: { detail },
        } = await VendorService.updateVendor(vendor.id, submitData);
        toast.success(detail);
      } else {
        const { data } = await VendorService.add(submitData);
        toast.success(data.detail);
      }
      if (noThankYou) {
        queryClient.invalidateQueries({ queryKey: ["getAdminVendors"] });
      } else {
        setOpen(true);
      }
      setShow(false);
    } catch (err) {
      console.error(err);

      helpers.setStatus({ success: false });
      helpers.setErrors({
        submit: err?.response?.data?.message || err.message,
      });
      helpers.setSubmitting(false);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (values, helpers) => {
    showConfirmDlg({
      open: true,
      close: hideConfirm,
      callback: () => handleSubmit(values, helpers),
    });
  };

  const initialValues = {
    email: vendor?.email ?? "",
    address: vendor?.address ?? "",
    name: vendor?.name ?? "",
    phone: vendor?.phone ?? "",
    website: vendor?.website ?? "",
    w9: vendor?.w9 ?? "",
    hours: vendor?.hours ?? "",
    category: vendor?.category ?? "",
    notes: vendor?.notes ?? "",
    forms: vendor?.forms ?? [{ name: "", title: "", template_key: "" }],
    submit: null,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    email: Yup.string().email("Must be a valid email").max(255).required("Required"),
    phone: Yup.string().phone("US", "Please enter a valid phone number"),
    forms: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required(`required`),
        title: Yup.string().required(`required`),
        template_key: Yup.string().required(`required`),
      }),
    ),
  });

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <Modal size="sm"
open={show}
onClose={handleClose}
title="Add Vendor">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form id="vendor-form">
              <Box
                display="grid"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                  gap: 2,
                }}
              >
                <InputField name="name"
label="Name*"
sx={{ gridColumn: "span 2" }}
fullWidth />

                <InputField
                  type="email"
                  name="email"
                  label="Email*"
                  sx={{ gridColumn: "span 2" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <MailIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                />
                <InputField
                  name="address"
                  label="Address*"
                  sx={{ gridColumn: "span 4" }}
                  fullWidth
                />
                <InputField
                  name="phone"
                  label="Phone"
                  sx={{ gridColumn: "span 2" }}
                  InputProps={{
                    inputComponent: InputPhone,
                    endAdornment: (
                      <InputAdornment position="end">
                        <PhoneIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                />
                <InputField
                  name="category"
                  label="Category"
                  sx={{ gridColumn: "span 2" }}
                  fullWidth
                />
                <InputField name="w9"
label="W9"
sx={{ gridColumn: "span 4" }}
fullWidth />
                <InputField
                  name="website"
                  label="Website"
                  sx={{ gridColumn: "span 4" }}
                  fullWidth
                />
                <InputField
                  multiline
                  rows={3}
                  maxRows={5}
                  name="hours"
                  label="Hours"
                  sx={{ gridColumn: "span 4" }}
                  fullWidth
                />
                <InputField
                  multiline
                  rows={2}
                  maxRows={5}
                  name="notes"
                  label="Notes"
                  sx={{ gridColumn: "span 4" }}
                  fullWidth
                />
                <VendorMultiForm values={values}
setFieldValue={setFieldValue} />
              </Box>
              <Stack direction="row"
spacing={2}
mt={2}>
                <Button
                  disabled={isSubmitting || loading}
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={(isSubmitting || loading) && <CircularProgress size={24} />}
                >
                  Submit
                </Button>
                <Button onClick={handleClose}
variant="outlined">
                  Cancel
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
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

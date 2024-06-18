import { useFormik } from "formik";
import * as Yup from "yup";
import "yup-phone-lite";
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Typography,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  IconButton,
  Stack,
} from "@mui/material";
import { Phone as PhoneIcon, Mail as MailIcon, LaunchOutlined } from "@mui/icons-material";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

import { useAuth } from "src/hooks/use-auth";
import { InputPhone } from "src/components/widgets/input-phone";
import { Modal } from "../common/modal";
import { VendorService } from "src/services";
import { useCallback } from "react";
import { CreditAuthList, RentalAgreementList } from "src/utils/constants";

export const UpdateVendor = ({ vendor, open, onClose }) => {
  const queryClient = useQueryClient();

  const { showConfirmDlg, hideConfirm } = useAuth();

  const handleSubmitPerson = async (values, helpers) => {
    hideConfirm();
    try {
      const { data: vendorData } = await VendorService.updateVendor(vendor.id, values);
      queryClient.invalidateQueries({ queryKey: ["getAdminVendors"] });
      toast.success(vendorData.detail);
      onClose();
    } catch (err) {
      console.error(err);

      helpers.setStatus({ success: false });
      helpers.setErrors({
        submit: err?.response?.data?.message || err.message,
      });
      helpers.setSubmitting(false);
    }
  };

  const onSubmit = async (values, helpers) => {
    showConfirmDlg({
      open: true,
      close: hideConfirm,
      callback: () => handleSubmitPerson(values, helpers),
    });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: vendor?.name,
      credit_auth: vendor?.credit_auth ?? "",
      rental_agreement: vendor?.rental_agreement || "",
      addition: vendor?.addition || "",
      w9: vendor?.w9 || "",
      website: vendor?.website || "",
      email: vendor?.email || "",
      phone: vendor?.phone || "",
      hours: vendor?.hours || "",
      category: vendor?.category || "",
      address: vendor?.address || "",
      active: vendor?.active || false,
      is_template: vendor?.is_template || false,
      submit: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Must be a valid email").max(255),
      phone: Yup.string().phone("US", "Please enter a valid phone number"),
    }),
    onSubmit,
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  const selectedCreditAuth = useCallback((selected) => {
    return CreditAuthList.find(({ script }) => script === selected);
  }, []);

  const selectedRentalAgreemtn = useCallback((selected) => {
    return RentalAgreementList.find(({ script }) => script === selected);
  }, []);

  return (
    <>
      <Modal
        size="sm"
        open={open}
        onClose={handleClose}
        title="Update Vendor"
        subTitle={vendor?.user?.email}
      >
        <form noValidate
onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <TextField
              autoFocus
              error={Boolean(formik.touched.name && formik.errors.name)}
              fullWidth
              helperText={formik.touched.name && formik.errors.name}
              label="Name"
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <FormControl fullWidth
margin="normal"
size="small"
error={formik.errors.credit_auth}>
              <InputLabel>Credit Auth</InputLabel>
              <Select
                name="credit_auth"
                value={formik.values.credit_auth}
                onChange={formik.handleChange}
                input={<OutlinedInput label="Chip" />}
                renderValue={(selected) => (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: 0.5,
                    }}
                  >
                    <Typography textTransform="uppercase">
                      {selectedCreditAuth(selected)?.name}
                    </Typography>
                    <IconButton
                      size="small"
                      color="info"
                      href={selectedCreditAuth(selected)?.link}
                      target="_blank"
                    >
                      <LaunchOutlined />{" "}
                    </IconButton>
                  </Box>
                )}
              >
                {CreditAuthList?.map(({ name, script }) => (
                  <MenuItem key={script}
value={script}
sx={{ justifyContent: "space-between" }}>
                    <Typography textTransform="uppercase">{name}</Typography>
                    <IconButton color="info"
size="small"
href={selectedCreditAuth(script)?.link}>
                      <LaunchOutlined />{" "}
                    </IconButton>
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {formik.errors.credit_auth || formik.errors.credit_auth}
              </FormHelperText>
            </FormControl>
            <FormControl
              fullWidth
              margin="normal"
              size="small"
              error={formik.errors.rental_agreement}
            >
              <InputLabel>Rental Agreement</InputLabel>
              <Select
                name="rental_agreement"
                value={formik.values.rental_agreement}
                onChange={formik.handleChange}
                input={<OutlinedInput label="Chip" />}
                renderValue={(selected) => (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: 0.5,
                    }}
                  >
                    <Typography textTransform="uppercase">
                      {selectedRentalAgreemtn(selected)?.name}
                    </Typography>
                    <IconButton
                      size="small"
                      color="info"
                      href={selectedRentalAgreemtn(selected)?.link}
                      target="_blank"
                    >
                      <LaunchOutlined />{" "}
                    </IconButton>
                  </Box>
                )}
              >
                {RentalAgreementList?.map(({ name, script }) => (
                  <MenuItem key={script}
value={script}
sx={{ justifyContent: "space-between" }}>
                    <Typography textTransform="uppercase">{name}</Typography>
                    <IconButton
                      color="info"
                      size="small"
                      href={selectedRentalAgreemtn(script)?.link}
                    >
                      <LaunchOutlined />{" "}
                    </IconButton>
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {formik.errors.rental_agreement || formik.errors.rental_agreement}
              </FormHelperText>
            </FormControl>
            <TextField
              type="url"
              error={Boolean(formik.touched.w9 && formik.errors.w9)}
              fullWidth
              helperText={formik.touched.w9 && formik.errors.w9}
              label="W9"
              name="w9"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.w9}
            />
            <TextField
              type="url"
              error={Boolean(formik.touched.website && formik.errors.website)}
              fullWidth
              helperText={formik.touched.website && formik.errors.website}
              label="Website"
              name="website"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.website}
            />
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <MailIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              error={Boolean(formik.touched.address && formik.errors.address)}
              fullWidth
              helperText={formik.touched.address && formik.errors.address}
              label="Address"
              name="address"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.address}
            />
            <TextField
              error={Boolean(formik.touched.phone && formik.errors.phone)}
              fullWidth
              helperText={formik.touched.phone && formik.errors.phone}
              label="Phone"
              name="phone"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.phone}
              InputProps={{
                inputComponent: InputPhone,
                endAdornment: (
                  <InputAdornment position="end">
                    <PhoneIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              error={Boolean(formik.touched.category && formik.errors.category)}
              fullWidth
              helperText={formik.touched.category && formik.errors.category}
              label="Category"
              name="category"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.category}
            />
            <TextField
              rows={5}
              multiline
              error={Boolean(formik.touched.hours && formik.errors.hours)}
              fullWidth
              helperText={formik.touched.hours && formik.errors.hours}
              label="Hours"
              name="hours"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.hours}
            />
            <FormControl fullWidth
margin="normal"
size="small"
error={formik.errors.active}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formik.values.active}
                    onChange={formik.handleChange}
                    name="active"
                  />
                }
                label="Is Active?"
              />
              <FormHelperText>{formik.errors.active || formik.errors.active}</FormHelperText>
            </FormControl>
            <FormControl fullWidth
margin="normal"
size="small"
error={formik.errors.is_template}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formik.values.is_template}
                    onChange={formik.handleChange}
                    name="is_template"
                  />
                }
                label="Is Template?"
              />
              <FormHelperText>
                {formik.errors.is_template || formik.errors.is_template}
              </FormHelperText>
            </FormControl>
          </Stack>
          <Box sx={{ my: 3, textAlign: "center" }}>
            <Button type="submit"
variant="contained"
size="small"
sx={{ mr: 2 }}>
              Update
            </Button>
            <Button onClick={handleClose}
variant="outlined"
size="small">
              Cancel
            </Button>
          </Box>
        </form>
      </Modal>
    </>
  );
};

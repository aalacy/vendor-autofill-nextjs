import React from "react";
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  useMediaQuery,
  FormHelperText,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import {
  Phone as PhoneIcon,
  Mail as MailIcon,
  AttachMoney as DollarIcon,
} from "@mui/icons-material";

import { InputPhone } from "src/components/widgets/input-phone";
import { useMounted } from "src/hooks/use-mounted";
import { ContractOptions, ContractTypes, DepartmentType } from "src/utils/constants";

export const ContactAddForm = ({ contact, handleUpdate, submitForm, onClose }) => {
  const isMounted = useMounted();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
  const handleFormSubmit = async (values, helpers) => {
    try {
      if (isMounted()) {
        if (contact) {
          await handleUpdate(contact.id, values);
        } else {
          await submitForm(values);
          helpers.setTouched({});
          helpers.setSubmitting(false);
        }
        toast.success("Successfully done.");
      }
    } catch (err) {
      const submit = err.message || err.response?.data;
      helpers.setStatus({ success: false });
      helpers.setErrors({ submit });
      helpers.setSubmitting(false);
    }
  };

  const initialValues = {
    first_name: contact?.first_name || "",
    last_name: contact?.last_name || "",
    position: contact?.position || "",
    email: contact?.email || "",
    phone: contact?.phone || "",
    contract_per_day: contact?.contract_per_day || "",
    contract_per_week: contact?.contract_per_week || "",
    contract_per_month: contact?.contract_per_month || "",
    contract_type: contact?.contract_type || "",
    aipc_line_number: contact?.aipc_line_number || "",
    department: contact?.department || DepartmentType[0],
    union: contact?.union || 0,
    rate: contact?.rate || 0,
  };
  const checkoutSchema = yup.object().shape({
    first_name: yup.string().required("Required"),
    last_name: yup.string().required("Required"),
    position: yup.string().required("Required"),
    email: yup.string().email("Invalid email!").required("Required"),
    phone: yup.string().matches(phoneRegExp, "phone number is not valid!"),
    union: yup.number().min(0),
    rate: yup.number().min(0).required("Required"),
    contract_per_day: yup.string().required("Required"),
    contract_per_week: yup.string().required("Required"),
    contract_per_month: yup.string().required("Required"),
    contract_type: yup.string().required("Required"),
    aipc_line_number: yup.string().length(4, "4 digit number").test(
      'is-number',
      (d) => `The value should be 4-digit number`,
      (value) => Number(value)
    ).required("Required"),
  });

  return (
    <Box>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                type="text"
                size="small"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.first_name}
                name="first_name"
                error={!!touched.first_name && !!errors.first_name}
                helperText={touched.first_name && errors.first_name}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                type="text"
                size="small"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.last_name}
                name="last_name"
                error={!!touched.last_name && !!errors.last_name}
                helperText={touched.last_name && errors.last_name}
                sx={{ gridColumn: "span 2" }}
              />
              
              <TextField
                fullWidth
                type="text"
                size="small"
                label="Email Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Phone Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                name="phone"
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
                placeholder="(000) 000-0000"
                sx={{ gridColumn: "span 2" }}
                InputProps={{
                  inputComponent: InputPhone,
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                type="text"
                size="small"
                label="Position"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.position}
                name="position"
                error={!!touched.position && !!errors.position}
                helperText={touched.position && errors.position}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                select
                type="text"
                label="Department"
                size="small"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.department}
                name="department"
                error={!!touched.department && !!errors.department}
                helperText={touched.department && errors.department}
                sx={{ gridColumn: "span 2" }}
              >
                {DepartmentType.map((key) => (
                  <MenuItem key={key} value={key}>
                    {key}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                type="number"
                size="small"
                label="Rate"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.rate}
                name="rate"
                error={!!touched.rate && !!errors.rate}
                helperText={touched.rate && errors.rate}
                sx={{ gridColumn: "span 2" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DollarIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                select
                type="text"
                label="Contract Per Day"
                size="small"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contract_per_day}
                name="contract_per_day"
                error={!!touched.contract_per_day && !!errors.contract_per_day}
                helperText={touched.contract_per_day && errors.contract_per_day}
                sx={{ gridColumn: "span 2" }}
              >
                {ContractOptions.map((key) => (
                  <MenuItem key={key} value={key}>
                    {key}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                select
                type="text"
                label="Contract Per Week"
                size="small"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contract_per_week}
                name="contract_per_week"
                error={!!touched.contract_per_week && !!errors.contract_per_week}
                helperText={touched.contract_per_week && errors.contract_per_week}
                sx={{ gridColumn: "span 2" }}
              >
                {ContractOptions.map((key) => (
                  <MenuItem key={key} value={key}>
                    {key}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                select
                type="text"
                label="Contract Per Month"
                size="small"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contract_per_month}
                name="contract_per_month"
                error={!!touched.contract_per_month && !!errors.contract_per_month}
                helperText={touched.contract_per_month && errors.contract_per_month}
                sx={{ gridColumn: "span 2" }}
              >
                {ContractOptions.map((key) => (
                  <MenuItem key={key} value={key}>
                    {key}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                type="number"
                size="small"
                label="Union"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.union}
                name="union"
                error={!!touched.union && !!errors.union}
                helperText={touched.union && errors.union}
                sx={{ gridColumn: "span 2" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DollarIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
               <TextField
                fullWidth
                type="text"
                size="small"
                label="AIPC/Line Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.aipc_line_number}
                name="aipc_line_number"
                error={!!touched.aipc_line_number && !!errors.aipc_line_number}
                helperText={touched.aipc_line_number && errors.aipc_line_number}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                select
                type="text"
                label="Contract Type"
                size="small"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contract_type}
                name="contract_type"
                error={!!touched.contract_type && !!errors.contract_type}
                helperText={touched.contract_type && errors.contract_type}
                sx={{ gridColumn: "span 2" }}
              >
                {ContractTypes.map((key) => (
                  <MenuItem key={key} value={key}>
                    {key}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}
            <Box display="flex" justifyContent="end" mt="4em" gap={2}>
              <Button type="submit" variant="contained">
                {isSubmitting && <CircularProgress sx={{ mr: 1 }} color="inherit" size={20} />} {contact ? 'Update' : 'Add'}
              </Button>
              <Button onClick={onClose} variant="outlined">
                Close
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

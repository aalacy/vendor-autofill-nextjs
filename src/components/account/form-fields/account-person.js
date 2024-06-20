import { useFormik } from "formik";
import * as Yup from "yup";
import "yup-phone-lite";
import { Box, Button, TextField, InputAdornment } from "@mui/material";
import { Phone as PhoneIcon } from "@mui/icons-material";
import toast from "react-hot-toast";

import { useAuth } from "src/hooks/use-auth";
import { Modal } from "src/components/common/modal";
import { InputPhone } from "src/components/widgets/input-phone";
import { UserService } from "src/services";

export const AccountPerson = ({ show, setShow }) => {
  const { user, setUser, showConfirmDlg, hideConfirm } = useAuth();

  const handleSubmitPerson = async (values, helpers) => {
    hideConfirm();

    const { submit, ...other } = values;
    try {
      const { data } = await UserService.updatePerson(user.id, user.person_id, other);
      localStorage.setItem("auth_token", data.result.access_token);
      setShow(false);
      setUser(data.result.user);
      toast.success(data.detail);
    } catch (err) {
      toast.error(err?.response?.data || err.message);
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
      first_name: user?.person?.first_name || "",
      last_name: user?.person?.last_name || "",
      title: user?.person?.title || "",
      phone_number: user?.person?.phone_number || "",
      submit: null,
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("Required"),
      last_name: Yup.string().required("Required"),
      title: Yup.string().required("Required"),
      phone_number: Yup.string()
        .phone("US", "Please enter a valid phone number")
        .required("Required"),
    }),
    onSubmit,
  });

  const handleClose = () => {
    formik.resetForm();
    setShow(false);
  };

  return (
    <Modal size="sm" open={show} onClose={handleClose} title="Update Contact">
      <form noValidate onSubmit={formik.handleSubmit}>
        <Box>
          <TextField
            autoFocus
            error={Boolean(formik.touched.first_name && formik.errors.first_name)}
            fullWidth
            helperText={formik.touched.first_name && formik.errors.first_name}
            label="First Name"
            margin="dense"
            name="first_name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            size="small"
            value={formik.values.first_name}
          />
          <TextField
            autoFocus
            error={Boolean(formik.touched.last_name && formik.errors.last_name)}
            fullWidth
            helperText={formik.touched.last_name && formik.errors.last_name}
            label="Last Name"
            margin="dense"
            name="last_name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            size="small"
            value={formik.values.last_name}
          />
          <TextField
            autoFocus
            error={Boolean(formik.touched.title && formik.errors.title)}
            fullWidth
            helperText={formik.touched.title && formik.errors.title}
            label="Title"
            margin="dense"
            name="title"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            size="small"
            value={formik.values.title}
          />
          <TextField
            autoFocus
            error={Boolean(formik.touched.phone_number && formik.errors.phone_number)}
            fullWidth
            helperText={formik.touched.phone_number && formik.errors.phone_number}
            label="Phone"
            margin="dense"
            name="phone_number"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            size="small"
            value={formik.values.phone_number}
            InputProps={{
              inputComponent: InputPhone,
              endAdornment: (
                <InputAdornment position="end">
                  <PhoneIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box sx={{ my: 2, textAlign: "center" }}>
          <Button type="submit" variant="contained" size="small" sx={{ mr: 2 }}>
            Update
          </Button>
          <Button onClick={handleClose} variant="outlined" size="small">
            Cancel
          </Button>
        </Box>
      </form>
    </Modal>
  );
};

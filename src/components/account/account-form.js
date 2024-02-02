import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import {
  Visibility as EyeIcon,
  VisibilityOff as EyeOffIcon,
  Mail as MailIcon,
} from "@mui/icons-material";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

import { useAuth } from "src/hooks/use-auth";
import { useMounted } from "src/hooks/use-mounted";
import { UserService } from "src/services";

const handleMouseDownPassword = (event) => {
  event.preventDefault();
};
const handleMouseDownPassword1 = (event) => {
  event.preventDefault();
};

export const AccountForm = () => {
  const { user, showConfirmDlg, hideConfirm, setUser } = useAuth();
  const isMounted = useMounted();

  const [showEmail, setShowEmail] = useState(false);
  const [displayPassword, setDisplayPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);

  useEffect(() => {
    return () => {
      setShowEmail(false);
      setDisplayPassword(false);
    };
  }, []);

  const handleSubmit = async (values, helpers) => {
    hideConfirm();
    setShowEmail(false);
    setDisplayPassword(false);

    const { submit, confirmPassword, ...other} = values;
    try {
      const { data } = await UserService.updateUser(user.id, other);
      localStorage.setItem("auth_token", data.result.access_token);
      setUser(data.result.user);
      toast.success(data.detail);
    } catch (err) {
      console.error(err);

      if (isMounted()) {
        helpers.setStatus({ success: false });
        helpers.setErrors({
          submit: err?.response?.data?.message || err.message,
        });
        helpers.setSubmitting(false);
      }
    }
  };

  const onSubmit = async (values, helpers) => {
    showConfirmDlg({
      open: true,
      close: hideConfirm,
      callback: () => handleSubmit(values, helpers),
    });
  };

  const formikEmail = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: user?.email || "",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
    }),
    onSubmit,
  });

  const formikPassword = useFormik({
    initialValues: {
      password: user?.password || "",
      confirmPassword: "",
      submit: null,
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8)
        .max(255)
        .required("Password is required")
        .matches(
          /^(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Number and One Special Case Character"
        ),
      confirmPassword: Yup.string()
        .required("Please confirm your password")
        .oneOf([Yup.ref("password")], "Passwords do not match"),
    }),
    onSubmit,
  });

  const handleEmail = () => {
    setShowEmail(!showEmail);
  };

  const cancelEmail = () => {
    setShowEmail(false);
    setUser(user);
  };

  const handlePassword = () => {
    setDisplayPassword(!displayPassword);
  };

  const cancelPassword = () => {
    setDisplayPassword(false);
  };

  return (
    <>
      <Box maxWidth="md">
        <form noValidate onSubmit={formikEmail.handleSubmit}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 2,
              mb: 2,
            }}
          >
            <Typography
              sx={{
                fontWeight: "medium",
                display: showEmail ? "none" : "inherit",
              }}
            >
              {user?.email}
            </Typography>
            <TextField
              autoFocus
              error={Boolean(formikEmail.touched.email && formikEmail.errors.email)}
              fullWidth
              helperText={formikEmail.touched.email && formikEmail.errors.email}
              label="Email"
              margin="dense"
              name="email"
              onBlur={formikEmail.handleBlur}
              onChange={formikEmail.handleChange}
              type="email"
              size="small"
              value={formikEmail.values.email}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <MailIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              sx={{
                display: showEmail ? "inherit" : "none",
              }}
            />
            {showEmail ? (
              <Box>
                <Button type="submit" variant="contained" size="small" sx={{ px: 4, mr: 2 }}>
                  Update Email
                </Button>
                <Button onClick={cancelEmail} variant="outlined" size="small" sx={{ px: 4 }}>
                  Cancel
                </Button>
              </Box>
            ) : (
              <Button onClick={handleEmail} variant="outlined" size="small" sx={{ px: 4 }}>
                Edit Email
              </Button>
            )}
          </Box>
        </form>
        <form noValidate onSubmit={formikPassword.handleSubmit}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 2,
              mb: 2,
            }}
          >
            <Typography
              sx={{
                display: displayPassword ? "none" : "inherit",
                fontWeight: "medium",
              }}
            >
              ******************
            </Typography>
            <TextField
              error={Boolean(formikPassword.touched.password && formikPassword.errors.password)}
              fullWidth
              helperText={formikPassword.touched.password && formikPassword.errors.password}
              label="Password *"
              margin="dense"
              name="password"
              size="small"
              onBlur={formikPassword.handleBlur}
              onChange={formikPassword.handleChange}
              type={showPassword ? "text" : "password"}
              value={formikPassword.values.password}
              sx={{ display: displayPassword ? "inherit" : "none" }}
              inputProps={{
                autoComplete: "new-password", // disable autocomplete and autofill
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              error={Boolean(
                formikPassword.touched.confirmPassword && formikPassword.errors.confirmPassword
              )}
              fullWidth
              helperText={
                formikPassword.touched.confirmPassword && formikPassword.errors.confirmPassword
              }
              label="Confirm Password *"
              margin="dense"
              name="confirmPassword"
              size="small"
              onBlur={formikPassword.handleBlur}
              onChange={formikPassword.handleChange}
              type={showPassword1 ? "text" : "password"}
              value={formikPassword.values.confirmPassword}
              sx={{ display: displayPassword ? "inherit" : "none" }}
              inputProps={{
                autoComplete: "new-password", // disable autocomplete and autofill
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword1}
                      onMouseDown={handleMouseDownPassword1}
                      edge="end"
                    >
                      {showPassword1 ? <EyeOffIcon /> : <EyeIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {displayPassword ? (
              <Box>
                <Button type="submit" variant="contained" size="small" sx={{ mr: 2 }}>
                  Update Password
                </Button>
                <Button type="button" onClick={cancelPassword} variant="outlined" size="small">
                  Cancel
                </Button>
              </Box>
            ) : (
              <Button onClick={handlePassword} variant="outlined" size="small">
                Edit Password
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </>
  );
};

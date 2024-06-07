import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Visibility as EyeIcon,
  VisibilityOff as EyeOffIcon,
  Edit as PencilIcon,
} from "@mui/icons-material";
import { Box, IconButton, Button, InputAdornment, TextField, Typography } from "@mui/material";

import { useAuth } from "src/hooks/use-auth";

const handleMouseDownPassword = (event) => {
  event.preventDefault();
};
const handleMouseDownPassword1 = (event) => {
  event.preventDefault();
};

export const AccountPassword = ({ onSubmit }) => {
  const { user } = useAuth();

  const [displayPassword, setDisplayPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);

  useEffect(() => {
    return () => {
      setDisplayPassword(false);
    };
  }, []);

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
          "Must Contain 8 Characters, One Number and One Special Case Character",
        ),
      confirmPassword: Yup.string()
        .required("Please confirm your password")
        .oneOf([Yup.ref("password")], "Passwords do not match"),
    }),
    onSubmit,
  });

  return (
    <form noValidate
onSubmit={formikPassword.handleSubmit}>
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
        <Box>
          <Typography>Password</Typography>
          <Typography
            sx={{
              display: displayPassword ? "none" : "inherit",
              fontWeight: "medium",
            }}
            color="#8ab4f8"
            variant="caption"
          >
            ******************
          </Typography>
        </Box>
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
            formikPassword.touched.confirmPassword && formikPassword.errors.confirmPassword,
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
            <Button type="submit"
variant="contained"
size="small"
sx={{ mr: 2 }}>
              Update
            </Button>
            <Button
              type="button"
              onClick={() => setDisplayPassword(false)}
              variant="outlined"
              size="small"
            >
              Cancel
            </Button>
          </Box>
        ) : (
          <IconButton
            onClick={() => setDisplayPassword(!displayPassword)}
            variant="outlined"
            size="small"
          >
            <PencilIcon color="primary" />
          </IconButton>
        )}
      </Box>
    </form>
  );
};

import { useEffect, useState } from "react";
import { Mail as MailIcon, Edit as PencilIcon } from "@mui/icons-material";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";

import { useAuth } from "src/hooks/use-auth";

export const AccountEmail = ({ onSubmit }) => {
  const { user, setUser } = useAuth();

  const [showEmail, setShowEmail] = useState(false);

  const cancelEmail = () => {
    setShowEmail(false);
    formikEmail.setFieldValue("email", user?.email);
    setUser(user);
  };

  useEffect(() => {
    return () => {
      setShowEmail(false);
    };
  }, []);

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

  return (
    <form noValidate
onSubmit={formikEmail.handleSubmit}>
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
          <Typography>Email</Typography>
          <Typography
            sx={{
              fontWeight: "medium",
              display: showEmail ? "none" : "inherit",
            }}
            color="#8ab4f8"
            variant="caption"
          >
            {user?.email}
          </Typography>
        </Box>
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
            <Button type="submit"
variant="contained"
size="small"
sx={{ mr: 2 }}>
              Update
            </Button>
            <Button onClick={cancelEmail}
variant="outlined"
size="small">
              Cancel
            </Button>
          </Box>
        ) : (
          <IconButton onClick={() => setShowEmail(!showEmail)}
variant="outlined"
size="small">
            <PencilIcon color="primary" />
          </IconButton>
        )}
      </Box>
    </form>
  );
};

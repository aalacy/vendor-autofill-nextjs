import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Box, Button, TextField, Typography } from "@mui/material";

import { useAuth } from "src/hooks/use-auth";

export const AccountPhone = ({ onSubmit }) => {
  const { user, setUser } = useAuth();

  const [showPhone, setShowPhone] = useState(false);

  const cancelPhone = () => {
    setShowPhone(false);
    formikPhone.setFieldValue("phone", user?.person?.phone);
    setUser(user);
  };

  useEffect(() => {
    return () => {
      setShowPhone(false);
    };
  }, []);

  const formikPhone = useFormik({
    enableReinitialize: true,
    initialValues: {
      phone: user?.person?.phone || "",
      submit: null,
    },
    onSubmit,
  });

  return (
    <form noValidate
onSubmit={formikPhone.handleSubmit}>
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
          <Typography>Phone</Typography>
          <Typography
            sx={{
              fontWeight: "medium",
              display: showPhone ? "none" : "inherit",
            }}
            color="#8ab4f8"
            variant="caption"
          >
            {user?.person?.phone || "-"}
          </Typography>
        </Box>
        <TextField
          autoFocus
          error={Boolean(formikPhone.touched.phone && formikPhone.errors.phone)}
          fullWidth
          helperText={formikPhone.touched.phone && formikPhone.errors.phone}
          label="Phone"
          margin="dense"
          name="phone"
          onBlur={formikPhone.handleBlur}
          onChange={formikPhone.handleChange}
          size="small"
          value={formikPhone.values.phone}
          sx={{
            display: showPhone ? "inherit" : "none",
          }}
        />
        {showPhone ? (
          <Box>
            <Button type="submit"
variant="contained"
size="small"
sx={{ mr: 2 }}>
              Update
            </Button>
            <Button onClick={cancelPhone}
variant="outlined"
size="small">
              Cancel
            </Button>
          </Box>
        ) : (
          <Button onClick={() => setShowPhone(!showPhone)}
variant="outlined"
size="small">
            Edit
          </Button>
        )}
      </Box>
    </form>
  );
};

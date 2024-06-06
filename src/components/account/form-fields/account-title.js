import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Box, Button, TextField, Typography } from "@mui/material";

import { useAuth } from "src/hooks/use-auth";

export const AccountTitle = ({ onSubmit }) => {
  const { user, setUser } = useAuth();

  const [showTitle, setShowTitle] = useState(false);

  const cancelTitle = () => {
    setShowTitle(false);
    formikTitle.setFieldValue("title", user?.person?.title);
    setUser(user);
  };

  useEffect(() => {
    return () => {
      setShowTitle(false);
    };
  }, []);

  const formikTitle = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: user?.person?.title || "",
      submit: null,
    },
    onSubmit,
  });

  return (
    <form noValidate onSubmit={formikTitle.handleSubmit}>
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
          <Typography>Title</Typography>
          <Typography
            sx={{
              fontWeight: "medium",
              display: showTitle ? "none" : "inherit",
            }}
            color="#8ab4f8"
            variant="caption"
          >
            {user?.person?.title || "-"}
          </Typography>
        </Box>
        <TextField
          autoFocus
          error={Boolean(formikTitle.touched.title && formikTitle.errors.title)}
          fullWidth
          helperText={formikTitle.touched.title && formikTitle.errors.title}
          label="Title"
          margin="dense"
          name="title"
          onBlur={formikTitle.handleBlur}
          onChange={formikTitle.handleChange}
          size="small"
          value={formikTitle.values.title}
          sx={{
            display: showTitle ? "inherit" : "none",
          }}
        />
        {showTitle ? (
          <Box>
            <Button type="submit" variant="contained" size="small" sx={{ mr: 2 }}>
              Update
            </Button>
            <Button onClick={cancelTitle} variant="outlined" size="small">
              Cancel
            </Button>
          </Box>
        ) : (
          <Button onClick={() => setShowTitle(!showTitle)} variant="outlined" size="small">
            Edit
          </Button>
        )}
      </Box>
    </form>
  );
};

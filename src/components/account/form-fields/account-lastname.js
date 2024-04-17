import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Box, Button, TextField, Typography } from "@mui/material";

import { useAuth } from "src/hooks/use-auth";

export const AccountLastName = ({ onSubmit }) => {
    const { user, setUser } = useAuth();

    const [showLastName, setShowLastName] = useState(false);

    const cancelLastName = () => {
        setShowLastName(false);
        formikLastName.setFieldValue('last_name', user?.person?.last_name);
        setUser(user);
    };


    useEffect(() => {
        return () => {
            setShowLastName(false);
        };
    }, []);

    const formikLastName = useFormik({
        enableReinitialize: true,
        initialValues: {
            last_name: user?.person?.last_name || "",
            submit: null,
        },
        onSubmit,
    });

    return (
        <form noValidate onSubmit={formikLastName.handleSubmit}>
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
                    <Typography>Last Name</Typography>
                    <Typography
                        sx={{
                            fontWeight: "medium",
                            display: showLastName ? "none" : "inherit",
                        }}
                        color="#8ab4f8"
                        variant="caption"
                    >
                        {user?.person?.last_name || '-'}
                    </Typography>
                </Box>
                <TextField
                    autoFocus
                    error={Boolean(formikLastName.touched.last_name && formikLastName.errors.last_name)}
                    fullWidth
                    helperText={formikLastName.touched.last_name && formikLastName.errors.last_name}
                    label="Last Name"
                    margin="dense"
                    name="last_name"
                    onBlur={formikLastName.handleBlur}
                    onChange={formikLastName.handleChange}
                    size="small"
                    value={formikLastName.values.last_name}
                    sx={{
                        display: showLastName ? "inherit" : "none",
                    }}
                />
                {showLastName ? (
                    <Box>
                        <Button type="submit" variant="contained" size="small" sx={{ mr: 2 }}>
                            Update
                        </Button>
                        <Button onClick={cancelLastName} variant="outlined" size="small">
                            Cancel
                        </Button>
                    </Box>
                ) : (
                    <Button onClick={() => setShowLastName(!showLastName)} variant="outlined" size="small" >
                        Edit
                    </Button>
                )}
            </Box>
        </form>
    )
}
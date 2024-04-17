import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Box, Button, TextField, Typography } from "@mui/material";

import { useAuth } from "src/hooks/use-auth";

export const AccountFirstName = ({ onSubmit }) => {
    const { user, setUser } = useAuth();

    const [showFirstName, setShowFirstName] = useState(false);

    const cancelFirstName = () => {
        setShowFirstName(false);
        formikFirstName.setFieldValue('first_name', user?.person?.first_name);
        setUser(user);
    };


    useEffect(() => {
        return () => {
            setShowFirstName(false);
        };
    }, []);

    const formikFirstName = useFormik({
        enableReinitialize: true,
        initialValues: {
            first_name: user?.person?.first_name || "",
            submit: null,
        },
        onSubmit,
    });

    return (
        <form noValidate onSubmit={formikFirstName.handleSubmit}>
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
                    <Typography>First Name</Typography>
                    <Typography
                        sx={{
                            fontWeight: "medium",
                            display: showFirstName ? "none" : "inherit",
                        }}
                        color="#8ab4f8"
                        variant="caption"
                    >
                        {user?.person?.first_name || '-'}
                    </Typography>
                </Box>
                <TextField
                    autoFocus
                    error={Boolean(formikFirstName.touched.first_name && formikFirstName.errors.first_name)}
                    fullWidth
                    helperText={formikFirstName.touched.first_name && formikFirstName.errors.first_name}
                    label="First Name"
                    margin="dense"
                    name="first_name"
                    onBlur={formikFirstName.handleBlur}
                    onChange={formikFirstName.handleChange}
                    size="small"
                    value={formikFirstName.values.first_name}
                    sx={{
                        display: showFirstName ? "inherit" : "none",
                    }}
                />
                {showFirstName ? (
                    <Box>
                        <Button type="submit" variant="contained" size="small" sx={{ mr: 2 }}>
                            Update
                        </Button>
                        <Button onClick={cancelFirstName} variant="outlined" size="small">
                            Cancel
                        </Button>
                    </Box>
                ) : (
                    <Button onClick={() => setShowFirstName(!showFirstName)} variant="outlined" size="small" >
                        Edit
                    </Button>
                )}
            </Box>
        </form>
    )
}
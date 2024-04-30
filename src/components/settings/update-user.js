import { useFormik } from "formik";
import * as Yup from "yup";
import "yup-phone-lite";
import { Box, Button, TextField, InputAdornment, MenuItem, Typography, Select, OutlinedInput, Chip, FormControl, InputLabel, Checkbox, FormHelperText } from "@mui/material";
import {
    Phone as PhoneIcon,
    Mail as MailIcon
} from "@mui/icons-material";
import toast from "react-hot-toast";
import { useQueryClient } from '@tanstack/react-query'

import { useAuth } from "src/hooks/use-auth";
import { InputPhone } from "src/components/widgets/input-phone";
import { Modal } from "../common/modal"
import { UserService } from "src/services";
import { useCallback } from "react";


export const UpdateUser = ({ user, roles, open, onClose }) => {
    const queryClient = useQueryClient()

    const { showConfirmDlg, hideConfirm } = useAuth();

    const handleSubmitPerson = async (values, helpers) => {
        hideConfirm();

        const { email, roles, first_name, last_name, title, phone_number } = values;
        try {
            const { data: userData } = await UserService.updateUser(user.id, {
                email
            });
            await UserService.updatePerson(user.id, user.person_id, {
                first_name,
                last_name,
                title,
                phone_number
            });
            await UserService.updateRole(user.id, {
                roles
            })
            queryClient.invalidateQueries({ queryKey: ['getAllUsers'] })
            toast.success(userData.detail);
            onClose()
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

    const roleName = useCallback((id) => {
        return roles.find(role => role.id === id).role_name
    }, [roles])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: user?.email,
            roles: user?.roles ? user.roles.map(role => role.id) : "",
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
            email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
            phone_number: Yup.string().phone("US", "Please enter a valid phone number").required("Required"),
            roles: Yup.array().min(1, "At least 1 role is required").required("Required")
        }),
        onSubmit,
    });

    const handleClose = () => {
        formik.resetForm();
        onClose();
    }

    return (
        <>
            <Modal size="sm" open={open} onClose={handleClose} title="Update User">
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
                            error={Boolean(formik.touched.email && formik.errors.email)}
                            fullWidth
                            helperText={formik.touched.email && formik.errors.email}
                            label="Email"
                            margin="dense"
                            name="email"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="email"
                            size="small"
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
                        <FormControl
                            fullWidth
                            margin="normal"
                            size="small"
                            error={formik.errors.roles}
                        >
                            <InputLabel>Roles</InputLabel>
                            <Select
                                multiple
                                name="roles"
                                value={formik.values.roles}
                                onChange={formik.handleChange}
                                input={<OutlinedInput label="Chip" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip size="small" key={value} color={roleName(value) === 'admin' ? 'primary' : "success"} label={<Typography textTransform="capitalize">{roleName(value)}</Typography>} />
                                        ))}
                                    </Box>
                                )}
                            >
                                {roles?.map(({ id, role_name }) => (
                                    <MenuItem key={id} value={id}>
                                        <Checkbox checked={formik.values.roles.indexOf(id) > -1} />
                                        <Typography textTransform="capitalize">{role_name}</Typography>
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>{formik.errors.roles || formik.errors.roles}</FormHelperText>
                        </FormControl>
                    </Box>
                    <Box sx={{ my: 3, textAlign: "center" }}>
                        <Button type="submit" variant="contained" size="small" sx={{ mr: 2 }}>
                            Update
                        </Button>
                        <Button onClick={handleClose} variant="outlined" size="small">
                            Cancel
                        </Button>
                    </Box>
                </form>
            </Modal>
        </>
    )
}
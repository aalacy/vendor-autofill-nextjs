import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CircularProgress, Box, Button, Link, Stack, TextField, Typography, InputAdornment, IconButton, useMediaQuery } from '@mui/material';
import {
  Visibility as EyeIcon,
  VisibilityOff as EyeOffIcon
} from "@mui/icons-material"
import { useState } from 'react';

import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';

const handleMouseDownPassword = (event) => {
  event.preventDefault();
};
const handleMouseDownPassword1 = (event) => {
  event.preventDefault();
};

const Page = () => {
  const router = useRouter();
  const auth = useAuth();

  const isNonMobile = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      title: '',
      phone_number: '',
      email: '',
      password: '',
      confirmPassword: '',
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
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
    onSubmit: async (values, helpers) => {
      try {
        setLoading(true);

        const { confirmPassword, ...other } = values;
        await auth.signUp(other);
        router.push('/');
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.response?.data?.detail || err.message });
        helpers.setSubmitting(false);
      } finally {
        setLoading(false);
      }
    }
  });

  return (
    <>
      <Head>
        <title>
          Register | Prodbot
        </title>
      </Head>
      <Box
        sx={{
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            width: '100%'
          }}
        >
          <Stack
            spacing={1}
            sx={{ mb: 3 }}
          >
            <Typography variant="h4">
              Register
            </Typography>
            <Typography
              color="text.secondary"
              variant="body2"
            >
              Already have an account?
              &nbsp;
              <Link
                component={NextLink}
                href="/auth/login"
                underline="hover"
                variant="subtitle2"
              >
                Log in
              </Link>
            </Typography>
          </Stack>
          <form
            noValidate
            onSubmit={formik.handleSubmit}
          >
            <Box
              display="grid"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                gap: 2
              }}
            >

              <TextField
                error={!!(formik.touched.first_name && formik.errors.first_name)}
                fullWidth
                helperText={formik.touched.first_name && formik.errors.first_name}
                label="First Name"
                name="first_name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.first_name}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                error={!!(formik.touched.last_name && formik.errors.last_name)}
                fullWidth
                helperText={formik.touched.last_name && formik.errors.last_name}
                label="Last Name"
                name="last_name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.last_name}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                error={!!(formik.touched.title && formik.errors.title)}
                fullWidth
                helperText={formik.touched.title && formik.errors.title}
                label="Title"
                name="title"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.title}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                error={!!(formik.touched.phone_number && formik.errors.phone_number)}
                fullWidth
                helperText={formik.touched.phone_number && formik.errors.phone_number}
                label="Phone"
                name="phone_number"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.phone_number}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                error={!!(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Email Address"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="email"
                value={formik.values.email}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                error={!!(formik.touched.password && formik.errors.password)}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                label="Password"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type={showPassword ? "text" : "password"}
                value={formik.values.password}
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
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                error={Boolean(
                  formik.touched.confirmPassword && formik.errors.confirmPassword,
                )}
                fullWidth
                helperText={
                  formik.touched.confirmPassword && formik.errors.confirmPassword
                }
                label="Confirm Password *"
                name="confirmPassword"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type={showPassword1 ? "text" : "password"}
                value={formik.values.confirmPassword}
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
                sx={{ gridColumn: "span 2" }}
              />
              {formik.errors.submit && (
                <Typography
                  color="error"
                  sx={{ mt: 3 }}
                  variant="body2"
                >
                  {formik.errors.submit}
                </Typography>
              )}
              <Box
                sx={{
                  mt: 2,
                  gridColumn: "span 4",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  type="submit"
                  variant="contained"
                  startIcon={loading || formik.isSubmitting ? <CircularProgress size={32} /> : null}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;

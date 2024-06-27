import { Box, Button, InputAdornment } from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import { EmailOutlined as EmailIcon } from "@mui/icons-material";

import { InputField } from "src/components/widgets";

export const COIRequestForm = ({ setGLoading, callback }) => {
  const handleSubmit = async (values) => {
    setGLoading(true);
    try {
      callback(values.email);
      toast.success("Successfully done");
    } catch (err) {
      toast.error(err.response?.data || err.message);
    } finally {
      setGLoading(false);
    }
  };

  const formInitialValues = { email: "" };
  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email!").required("Required"),
  });

  return (
    <Formik
      initialValues={formInitialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 2,
            mb: 2,
          }}
        >
          <InputField
            name="email"
            label="Email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button size="small" type="submit" variant="contained">
            Send
          </Button>
        </Box>
        </Form>
      )}
    </Formik>
  );
};

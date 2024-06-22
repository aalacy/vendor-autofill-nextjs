import { Formik, Form } from "formik";
import * as Yup from "yup";
import "yup-phone-lite";
import { Box, Button, InputAdornment, useMediaQuery, CircularProgress, Stack } from "@mui/material";
import MoneyIcon from "@mui/icons-material/MonetizationOnOutlined";
import toast from "react-hot-toast";
import { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { useAuth } from "src/hooks/use-auth";
import { Modal } from "src/components/common/modal";
import { VendorService } from "src/services";
import { CheckboxField, DatePickerField, InputField, SelectField } from "../widgets";
import { ORDER_TYPES } from "src/utils/constants";
import { MultiVendorFileInput } from "./multi-vendor-file-input";

const InvoiceQuoteForm = ({ show, onClose, onModalClose, myVendor, setMyVendor, invoice }) => {
  const { showConfirmDlg, hideConfirm, project } = useAuth();
  const queryClient = useQueryClient();

  const isNonMobile = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  const [loading, setLoading] = useState(false);

  const formikRef = useRef(null);

  const handleClose = () => {
    formikRef.current.resetForm();
    onClose();
  };

  const handleSubmit = async (values) => {
    hideConfirm();
    setLoading(true);
    const { submit, ...other } = values;
    try {
      const {
        data: { detail, result },
      } = await VendorService.addUpdateInvoice(myVendor.id, other, invoice?.id);
      toast.success(detail);
      setMyVendor(result)
      queryClient.invalidateQueries({ queryKey: ["getAllVendors", project?.id] });
      handleClose();
    } catch (err) {
      toast.error(err?.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (values, helpers) => {
    showConfirmDlg({
      open: true,
      close: hideConfirm,
      callback: async () => await handleSubmit(values, helpers),
    });
  };

  const initialValues = {
    order_type: invoice?.order_type || "",
    key: invoice?.key || "",
    paid_invoice: invoice?.paid_invoice || false,
    received_date: invoice?.received_date || "",
    order_number: invoice?.order_number || "",
    amount: invoice?.amount || 0,
    due_date: invoice?.due_date || "",
    line_number: invoice?.line_number || "",
    category: invoice?.category || "",
    order_summary: invoice?.order_summary || "",
    submit: null,
  };

  const validationSchema = Yup.object({
    order_type: Yup.string().required("Required"),
    key: Yup.string().when("order_type", {
      is: (val) => val !== "Placeholder",
      then: (schema) => schema.required(`Required`),
      otherwise: (schema) => schema.notRequired(),
    }),
    received_date: Yup.date(),
    due_date: Yup.date(),
    order_number: Yup.string().when("order_type", {
      is: (val) => val !== "Placeholder",
      then: (schema) => schema.required("Required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    category: Yup.string().required("Required"),
    amount: Yup.number().positive().required("Required"),
  });

  return (
    <>
      <Modal
        size="sm"
        open={show}
        onClose={handleClose}
        title={` ${invoice ? "Update" : "Add"} Invoice, Quote`}
      >
        <Formik
          innerRef={formikRef}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, values, setFieldValue, errors }) => (
            <Form id="invoice-quote-form">
              <Box
                display="grid"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                  gap: 2,
                }}
              >
                <SelectField
                  name="order_type"
                  label="Order Type*"
                  data={ORDER_TYPES}
                  sx={{ gridColumn: "span 4" }}
                />

                <MultiVendorFileInput
                  showDownload
                  setFieldValue={setFieldValue}
                  label={values.order_type}
                  name="key"
                  value={values.key}
                  vendor_name={myVendor.vendor?.name}
                  error={errors.key}
                  sx={{
                    gridColumn: "span 4",
                    display: values.order_type === "Placeholder" ? "none" : "inherit",
                  }}
                  disabled={!!!values.order_type}
                />

                <CheckboxField
                  name="paid_invoice"
                  label="Paid Invoice"
                  sx={{
                    gridColumn: "span 4",
                    display: values.order_type === "Invoice" ? "inherit" : "none",
                  }}
                />

                <DatePickerField
                  name="received_date"
                  label="Received Date"
                  sx={{
                    gridColumn: "span 2",
                    display: values.order_type === "Placeholder" ? "none" : "inherit",
                  }}
                />
                <DatePickerField
                  name="due_date"
                  label="Payment Due Date"
                  sx={{
                    gridColumn: "span 2",
                    display: values.order_type === "Placeholder" ? "none" : "inherit",
                  }}
                />
                <InputField
                  name="order_number"
                  label="Order Number*"
                  sx={{
                    gridColumn: "span 2",
                    display: values.order_type === "Placeholder" ? "none" : "inherit",
                  }}
                  fullWidth
                />
                <InputField
                  type="number"
                  name="amount"
                  label="Amount*"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <MoneyIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ gridColumn: "span 2" }}
                  fullWidth
                />

                <InputField
                  name="line_number"
                  label="Line Number"
                  sx={{
                    gridColumn: "span 2",
                    display: values.order_type === "Placeholder" ? "none" : "inherit",
                  }}
                  fullWidth
                />
                <InputField
                  name="category"
                  label="Category*"
                  sx={{ gridColumn: "span 2" }}
                  fullWidth
                />
                <InputField
                  multiline
                  rows={3}
                  name="order_summary"
                  label="Order Summary"
                  sx={{ gridColumn: "span 4" }}
                  fullWidth
                />
              </Box>
              <Stack direction="row" spacing={2} mt={2}>
                <Button
                  disabled={isSubmitting || loading}
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={(isSubmitting || loading) && <CircularProgress size={24} />}
                >
                  Submit
                </Button>
                <Button onClick={onClose} variant="outlined">
                  Cancel
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default InvoiceQuoteForm;

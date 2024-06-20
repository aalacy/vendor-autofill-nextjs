import { Formik, Form } from "formik";
import * as Yup from "yup";
import "yup-phone-lite";
import {Button, CircularProgress, Stack } from "@mui/material";
import toast from "react-hot-toast";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { useAuth } from "src/hooks/use-auth";
import { Modal } from "src/components/common/modal";
import { VendorService } from "src/services";
import { PAYMENT_TYPES } from "src/utils/constants";
import { SelectField } from "src/components/widgets";

const PaymentTypeForm = ({ show, onClose, myVendor }) => {
  const { showConfirmDlg, hideConfirm, project } = useAuth();
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    hideConfirm();
    setLoading(true);
    try {
      const {
        data: { detail },
      } = await VendorService.updatePaymentType(myVendor.id, values.payment_type);
      toast.success(detail);
      queryClient.invalidateQueries({ queryKey: ["getAllVendors", project?.id] });
      onClose();
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
      callback: () => handleSubmit(values, helpers),
    });
  };

  const initialValues = {
    payment_type: myVendor?.payment_type || "",
    submit: null,
  };

  const validationSchema = Yup.object({
    payment_type: Yup.string().required("Required"),
  });

  return (
    <>
      <Modal size="sm" open={show} onClose={onClose} title="Select Payment Type">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form id="payment-type-form">
              <SelectField
                name="payment_type"
                label="Payment Type*"
                data={PAYMENT_TYPES}
                fullWidth
              />
              <Stack direction="row" spacing={2} mt={5}>
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

export default PaymentTypeForm;

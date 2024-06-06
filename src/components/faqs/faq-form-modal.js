import { useState } from "react";
import toast from "react-hot-toast";
import { Button, Typography, CircularProgress, Box, Container, Grid } from "@mui/material";
import { Formik, Form } from "formik";
import { useQueryClient } from "@tanstack/react-query";

import { Modal } from "../common/modal";
import faqFormModel from "./FormModel/faqFormModel";
import faqValidationSchema from "./FormModel/faqValidationSchema";
import { FaqService } from "src/services";
import { InputField } from "../widgets";

const {
  formId,
  formField: { question, answer },
} = faqFormModel;

export const FaqFormModal = ({ curFaq, open, setOpen }) => {
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);

  const {
    formField: { question, answer },
  } = faqFormModel;

  const faqFormInitialValues = {
    [question.name]: curFaq?.question || "",
    [answer.name]: curFaq?.answer || "",
  };

  async function _submitForm(values, actions) {
    actions.setSubmitting(false);

    try {
      setLoading(true);
      if (curFaq) {
        await FaqService.update(curFaq.id, values);
      } else {
        await FaqService.add(values);
      }
      toast.success("Successfully submitted");
      onClose();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  function _handleSubmit(values, actions) {
    _submitForm(values, actions);
  }

  const onClose = () => {
    queryClient.invalidateQueries({ queryKey: ["getAllFaqs"] });
    setOpen(false);
  };

  return (
    <>
      <Modal
        title={<Typography variant="h5">Faq Form</Typography>}
        open={open}
        onClose={onClose}
        size="md"
      >
        <Container maxWidth="md">
          <Formik
            initialValues={faqFormInitialValues}
            validationSchema={faqValidationSchema}
            onSubmit={_handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form id={formId}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <InputField name={question.name} label={question.label} fullWidth />
                  </Grid>
                  <Grid item xs={12}>
                    <InputField
                      multiline
                      rows={3}
                      name={answer.name}
                      label={answer.label}
                      fullWidth
                    />
                  </Grid>
                </Grid>

                <Box sx={{ display: "flex", gap: 3, mt: 3 }}>
                  <Button
                    disabled={isSubmitting || loading}
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={(isSubmitting || loading) && <CircularProgress size={24} />}
                  >
                    Submit
                  </Button>
                  <Button variant="outlined" onClick={onClose}>
                    Close
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Container>
      </Modal>
    </>
  );
};

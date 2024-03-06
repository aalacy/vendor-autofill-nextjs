import { useState } from "react";
import toast from "react-hot-toast";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  CircularProgress,
  Box,
  Card,
  CardContent,
  Container,
  Divider,
} from "@mui/material";
import { Formik, Form } from "formik";
import Head from "next/head";

import { Step1 } from "src/components/job-form/step1";
import { Step2 } from "src/components/job-form/step2";
import { Step3 } from "src/components/job-form/step3";
import { Step4 } from "src/components/job-form/step4";
import { Step5 } from "src/components/job-form/step5";
import { Step6 } from "src/components/job-form/step6";
import checkoutFormModel from "src/components/job-form/FormModel/checkoutFormModel";
import validationSchema from "src/components/job-form/FormModel/validationSchema";
import formInitialValues from "src/components/job-form/FormModel/formInitialValues";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { JobService } from "src/services";

const steps = ["1", "2", "3", "4", "5", "6"];
const { formId, formField } = checkoutFormModel;

const _renderStepContent = (step, values) => {
  switch (step) {
    case 0:
      return <Step1 formField={formField} />;
    case 1:
      return <Step2 formField={formField} />;
    case 2:
      return <Step3 formField={formField} />;
    case 3:
      return <Step4 formField={formField} values={values} />;
    case 4:
      return <Step5 formField={formField} values={values} />;
    case 5:
      return <Step6 formField={formField} />;
    default:
      return (
        <Typography variant="h6" p={3}>
          Thank you very much
        </Typography>
      );
  }
};

export const JobFormPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  async function _submitForm(values, actions) {
    actions.setSubmitting(false);

    setActiveStep(activeStep + 1);

    try {
      setLoading(true);
      await JobService.add(values);
      toast.success("Successfully submitted");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  function _handleSubmit(values, actions) {
    if (isLastStep) {
      _submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  const _handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const _handleRetry = () => {
    setActiveStep(0);
  };

  return (
    <>
      <Head>
        <title>Job Form</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Container maxWidth="xl">
          <Card>
            <CardContent>
              <Typography component="h1" variant="h5" mb={3}>
                Job Form
              </Typography>
              <Stepper activeStep={activeStep}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel></StepLabel>
                  </Step>
                ))}
              </Stepper>
              <Divider sx={{ my: 3 }} />
              <>
                {activeStep >= steps.length ? (
                  <>
                    <Typography variant="h6" p={3}>
                      Thank you very much
                    </Typography>
                    <Button variant="outlined" onClick={_handleRetry}>
                      Retry
                    </Button>
                  </>
                ) : (
                  <Formik
                    initialValues={formInitialValues}
                    validationSchema={currentValidationSchema}
                    onSubmit={_handleSubmit}
                  >
                    {({ isSubmitting, values }) => (
                      <Form id={formId}>
                        {_renderStepContent(activeStep, values)}

                        <Box sx={{ display: "flex", gap: 3, mt: 3 }}>
                          {activeStep !== 0 && (
                            <Button variant="outlined" onClick={_handleBack}>
                              Back
                            </Button>
                          )}
                          <Button
                            disabled={isSubmitting || loading}
                            type="submit"
                            variant="contained"
                            color="primary"
                            startIcon={(isSubmitting || loading) && <CircularProgress size={24} />}
                          >
                            {isLastStep ? "Submit" : "Next"}
                          </Button>
                        </Box>
                      </Form>
                    )}
                  </Formik>
                )}
              </>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

JobFormPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default JobFormPage;

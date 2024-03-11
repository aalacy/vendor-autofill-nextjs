import { Formik, Form } from "formik";
import { Button, CircularProgress, Box } from "@mui/material";

import { MileageInitialValues } from "./FormModel/mileage-initialValues";
import { MileageValidationSchema } from "./FormModel/mileage-validation-schema";
import { MileageTop } from "./mileage-top";
import { MileageMainForm } from "./mileage-main";
import { MileageBottom } from "./mileage-bottom";

export const MileageAddForm = ({ loading, submitForm, mileage }) => {
  return (
    <>
      <Formik
        initialValues={MileageInitialValues(mileage)}
        validationSchema={MileageValidationSchema}
        onSubmit={submitForm}
        enableReinitialize
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <MileageTop values={values} />
            <MileageMainForm values={values} setFieldValue={setFieldValue}/>
            <MileageBottom values={values} />
            <Box sx={{ display: "flex", gap: 3, mt: 3 }}>
              <Button
                disabled={isSubmitting || loading}
                type="submit"
                variant="contained"
                color="primary"
                startIcon={(isSubmitting || loading) && <CircularProgress size={24} />}
              >
                {mileage ? "Update" : "Save"}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};

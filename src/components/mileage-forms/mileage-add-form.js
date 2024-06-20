import { Formik, Form } from "formik";
import { Button, CircularProgress, Box, FormHelperText, Typography } from "@mui/material";

import { MileageInitialValues } from "./FormModel/mileage-initialValues";
import { MileageValidationSchema } from "./FormModel/mileage-validation-schema";
import { MileageTop } from "./mileage-top";
import { MileageMainForm } from "./mileage-main";
import { useCallback, useMemo } from "react";
import { formatLocalNumber, sum } from "src/utils";
import { useAuth } from "src/hooks/use-auth";

export const MileageAddForm = ({ loading, submitForm, mileage, setEmpty }) => {
  const totalValues = useCallback((data) => {
    return (
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mb: 1 }}>
        <Typography variant="body1">
          Total # of miles: <b>{formatLocalNumber(sum(data.map((d) => d.number_of_miles)))}</b>
        </Typography>
        <Typography variant="body1">
          Total Mileage Reimbursement($):{" "}
          <b>{formatLocalNumber(sum(data.map((d) => d.mileage_reimbursement)))}</b>
        </Typography>
      </Box>
    );
  }, []);

  const { user } = useAuth();

  const fullName = useMemo(() => {
    return user ? `${user.person.first_name} ${user.person.last_name}` : "";
  }, [user]);

  return (
    <>
      <Formik
        initialValues={MileageInitialValues(mileage, fullName)}
        validationSchema={MileageValidationSchema}
        onSubmit={submitForm}
        enableReinitialize
      >
        {({ isSubmitting, values, setFieldValue, errors }) => (
          <Form>
            <MileageTop values={values} setFieldValue={setFieldValue} />
            <MileageMainForm setEmpty={setEmpty} values={values} setFieldValue={setFieldValue} />
            {totalValues(values?.data)}
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}
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

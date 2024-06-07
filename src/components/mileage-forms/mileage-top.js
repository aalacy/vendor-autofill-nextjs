import { Grid } from "@mui/material";
import { useEffect } from "react";

import { DatePickerField, InputField } from "src/components/widgets";
import { thisSunday } from "src/utils";

export const MileageTop = ({ values, setFieldValue }) => {
  useEffect(() => {
    setFieldValue("week_of", values.week_of || thisSunday());
  }, [setFieldValue, values.week_of]);

  return (
    <>
      <Grid container
spacing={3}
mb={3}>
        <Grid item
xs={12}
sm={6}>
          <InputField name="name"
label="Name"
fullWidth
size="small" />
        </Grid>
        <Grid item
xs={12}
sm={6}>
          <DatePickerField
            name="week_of"
            maxDate={new Date()}
            label="Week Of"
            format="MM/dd/yyyy"
            fullWidth
            size="small"
          />
        </Grid>
      </Grid>
    </>
  );
};

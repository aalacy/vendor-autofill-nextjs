import { Grid } from "@mui/material";

import { InputField } from "src/components/widgets";

export const Step1 = (props) => {
  const {
    formField: { email, jobName, jobNumber },
  } = props;

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <InputField name={email.name} label={email.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name={jobName.name} label={jobName.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name={jobNumber.name} label={jobNumber.label} fullWidth />
        </Grid>
      </Grid>
    </>
  );
};

import { Grid, Typography } from "@mui/material";

import { InputField } from "src/components/widgets";

export const Step2 = (props) => {
  const {
    formField: { authSignName, authSignTitle },
  } = props;

  return (
    <>
      <Grid container
spacing={3}>
        <Grid item
xs={12}>
          <Typography variant="subtitle1"
fontWeight="bold">
            Authorized Signatory Information
          </Typography>
        </Grid>
        <Grid item
xs={12}
sm={6}>
          <InputField name={authSignName.name}
label={authSignName.label}
fullWidth />
        </Grid>
        <Grid item
xs={12}
sm={6}>
          <InputField name={authSignTitle.name}
label={authSignTitle.label}
fullWidth />
        </Grid>
      </Grid>
    </>
  );
};

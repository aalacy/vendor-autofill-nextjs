import { Grid, Typography } from "@mui/material";

import { DatePickerField, InputField } from "src/components/widgets";

export const Step3 = (props) => {
  const {
    formField: { cardName, cardPhone, DLNumber, DLState, DLExpiry },
  } = props;

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="subtitle1" fontWeight="bold">
            Cardholder Information
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name={cardName.name} label={cardName.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name={cardPhone.name} label={cardPhone.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name={DLNumber.name} label={DLNumber.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name={DLState.name} label={DLState.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePickerField
            name={DLExpiry.name}
            label={DLExpiry.label}
            format="yyyy/MM"
            views={["year", "month"]}
            minDate={new Date()}
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  );
};

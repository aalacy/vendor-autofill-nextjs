import { Grid } from "@mui/material";

import { DatePickerField, InputField } from "src/components/widgets";

export const Step3 = (props) => {
  const {
    formField: {
      cardholderInfo,
      cardholderName,
      cardholderDriversLicenseNumber,
      cardholderDriversLicenseState,
      cardholderDriversLicenseExpiry,
    },
  } = props;

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <InputField name={cardholderInfo.name} label={cardholderInfo.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name={cardholderName.name} label={cardholderName.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            name={cardholderDriversLicenseNumber.name}
            label={cardholderDriversLicenseNumber.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            name={cardholderDriversLicenseState.name}
            label={cardholderDriversLicenseState.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePickerField
            name={cardholderDriversLicenseExpiry.name}
            label={cardholderDriversLicenseExpiry.label}
            format="MM/yy"
            views={["year", "month"]}
            minDate={new Date()}
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  );
};

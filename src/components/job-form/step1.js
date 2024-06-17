import { Grid, Typography } from "@mui/material";

import { CheckboxField, InputField, SelectField } from "src/components/widgets";

export const Step1 = (props) => {
  const {
    formField: {
      preferredEmailAddress,
      jobName,
      jobNumber,
      contactName,
      prodCoName,
      billAddress,
      billCity,
      billState,
      billZip,
      billPhone,
      invoiceEmail,
      shipAccount,
      shipAccountNumber,
      incorporationStatus,
    },
  } = props;

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="subtitle1" fontWeight="bold">
            Company Information
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name={prodCoName.name} label={prodCoName.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name={contactName.name} label={contactName.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name={jobName.name} label={jobName.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name={jobNumber.name} label={jobNumber.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name={billAddress.name} label={billAddress.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name={billCity.name} label={billCity.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name={billState.name} label={billState.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name={billZip.name} label={billZip.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name={billPhone.name} label={billPhone.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name={invoiceEmail.name} label={invoiceEmail.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectField
            name={shipAccount.name}
            label={shipAccount.label}
            data={shipAccount.data}
            fullWidth
          />
          {/* <SwitchField name={shipAccount.name} label={shipAccount.label} /> */}
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name={shipAccountNumber.name} label={shipAccountNumber.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            name={preferredEmailAddress.name}
            label={preferredEmailAddress.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CheckboxField
            name={incorporationStatus.name}
            label={incorporationStatus.label}
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  );
};

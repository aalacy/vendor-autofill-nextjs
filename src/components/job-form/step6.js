import { Grid } from '@mui/material';

import { InputField, SelectField } from 'src/components/widgets';

const shippingAccounts = [
  {
    value: 'Fedex',
    label: 'Fedex'
  },
  {
    value: 'UPS',
    label: 'UPS'
  }
];

export const Step6 = (props) => {
  const {
    formField: {
      shippingDetails,
      shippingAccount,
      shippingAccountNumber
    }
  } = props;

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <InputField name={shippingDetails.name} label={shippingDetails.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectField
              name={shippingAccount.name}
              label={shippingAccount.label}
              data={shippingAccounts}
              fullWidth
            />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name={shippingAccountNumber.name} label={shippingAccountNumber.label} fullWidth />
        </Grid>
      </Grid>
    </>
  );
}
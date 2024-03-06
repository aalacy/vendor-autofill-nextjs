import { Grid } from '@mui/material';

import { DatePickerField, InputField, SelectField } from 'src/components/widgets';

const accountTypes = [
  {
    value: 'Debit',
    label: 'Debit'
  },
  {
    value: 'Credit',
    label: 'Credit'
  }
];

const cardTypes = [
  {
    value: 'Visa',
    label: 'Visa'
  },
  {
    value: 'Mastercard',
    label: 'Mastercard'
  },
  {
    value: 'Amex',
    label: 'Amex'
  },
  {
    value: 'Discover',
    label: 'Discover'
  },
  {
    value: 'Other',
    label: 'Other'
  }
]

export const Step4 = (props) => {
  const {
    formField: {
      creditCardInfo,
      accountType,
      issuingBank,
      cardType,
      cardNumber,
      expirationDate,
      cvv,
      fourDigitCID,
    },
    values
  } = props;

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <InputField name={creditCardInfo.name} label={creditCardInfo.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectField
              name={accountType.name}
              label={accountType.label}
              data={accountTypes}
              fullWidth
            />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name={issuingBank.name} label={issuingBank.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
        <SelectField
              name={cardType.name}
              label={cardType.label}
              data={cardTypes}
              fullWidth
            />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name={cardNumber.name} label={cardNumber.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePickerField
            name={expirationDate.name}
            label={expirationDate.label}
            format="MM/yy"
            views={['year', 'month']}
            minDate={new Date()}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ display: values.cardType !== "Amex" ? "flex" : "none"}}>
          <InputField name={cvv.name} label={cvv.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ display: values.cardType === "Amex" ? "flex" : "none"}}>
          <InputField name={fourDigitCID.name} label={fourDigitCID.label} fullWidth />
        </Grid>
      </Grid>
    </>
  );
}
import { Grid, Typography } from "@mui/material";

import { DatePickerField, InputField, SelectField } from "src/components/widgets";

const acctTypes = [
  {
    value: "Debit",
    label: "Debit",
  },
  {
    value: "Credit",
    label: "Credit",
  },
];

const cardTypes = [
  {
    value: "Visa",
    label: "Visa",
  },
  {
    value: "Mastercard",
    label: "Mastercard",
  },
  {
    value: "Amex",
    label: "Amex",
  },
  {
    value: "Discover",
    label: "Discover",
  },
  {
    value: "Other",
    label: "Other",
  },
];

export const Step4 = (props) => {
  const {
    formField: {
      acctType,
      bank,
      cardType,
      cardNumber,
      expDate,
      cvv,
      CID,
    },
    values,
  } = props;

  return (
    <>
      <Grid container spacing={3}>
      <Grid item xs={12}>
          <Typography variant="subtitle1" fontWeight="bold">
          Payment Information
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectField
            name={acctType.name}
            label={acctType.label}
            data={acctTypes}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name={bank.name} label={bank.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectField name={cardType.name} label={cardType.label} data={cardTypes} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name={cardNumber.name} label={cardNumber.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePickerField
            name={expDate.name}
            label={expDate.label}
            format="MM/yy"
            views={["year", "month"]}
            minDate={new Date()}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ display: values.cardType !== "Amex" ? "flex" : "none" }}>
          <InputField name={cvv.name} label={cvv.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ display: values.cardType === "Amex" ? "flex" : "none" }}>
          <InputField name={CID.name} label={CID.label} fullWidth />
        </Grid>
      </Grid>
    </>
  );
};

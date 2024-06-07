import { Grid, Typography } from "@mui/material";

import { InputField } from "src/components/widgets";

export const Step2 = (props) => {
  const {
    formField: {
      productionCompanyName,
      billingAddress,
      billingCity,
      billingState,
      billingZipCode,
      billingPhoneNumber,
      emailAddressToReceiveInvoices,
      nameOfAuthorizedSignatory,
      titleOfAuthorizedSignatory,
    },
  } = props;

  return (
    <>
      <Grid container
spacing={3}>
        <Grid item
xs={12}
sm={6}>
          <InputField
            name={productionCompanyName.name}
            label={productionCompanyName.label}
            fullWidth
          />
        </Grid>
        <Grid item
xs={12}
sm={6}>
          <InputField name={billingAddress.name}
label={billingAddress.label}
fullWidth />
        </Grid>
        <Grid item
xs={12}
sm={6}>
          <InputField name={billingCity.name}
label={billingCity.label}
fullWidth />
        </Grid>
        <Grid item
xs={12}
sm={6}>
          <InputField name={billingState.name}
label={billingState.label}
fullWidth />
        </Grid>
        <Grid item
xs={12}
sm={6}>
          <InputField name={billingZipCode.name}
label={billingZipCode.label}
fullWidth />
        </Grid>
        <Grid item
xs={12}
sm={6}>
          <InputField name={billingPhoneNumber.name}
label={billingPhoneNumber.label}
fullWidth />
        </Grid>
        <Grid item
xs={12}
sm={6}>
          <InputField
            name={emailAddressToReceiveInvoices.name}
            label={emailAddressToReceiveInvoices.label}
            fullWidth
          />
        </Grid>
        <Grid item
xs={12}
sm={6}>
          <InputField
            name={nameOfAuthorizedSignatory.name}
            label={nameOfAuthorizedSignatory.label}
            fullWidth
          />
        </Grid>
        <Grid item
xs={12}
sm={6}>
          <InputField
            name={titleOfAuthorizedSignatory.name}
            label={titleOfAuthorizedSignatory.label}
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  );
};

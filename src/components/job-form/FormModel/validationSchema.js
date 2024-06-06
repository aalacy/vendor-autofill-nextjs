/* eslint-disable import/no-anonymous-default-export */
import * as Yup from "yup";
import checkoutFormModel from "./checkoutFormModel";
const {
  formField: {
    email,
    jobName,
    jobNumber,
    productionCompanyName,
    billingAddress,
    billingCity,
    billingState,
    billingZipCode,
    billingPhoneNumber,
    emailAddressToReceiveInvoices,
    nameOfAuthorizedSignatory,
    titleOfAuthorizedSignatory,
    cardholderInfo,
    cardholderName,
    cardholderDriversLicenseNumber,
    cardholderDriversLicenseState,
    cardholderDriversLicenseExpiry,
    accountType,
    issuingBank,
    cardType,
    cardNumber,
    expirationDate,
    cvv,
    fourDigitCID,
    buyers,
    shippingAccount,
    shippingAccountNumber,
  },
} = checkoutFormModel;

// const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;

export default [
  Yup.object().shape({
    [email.name]: Yup.string().email("Invalid email!").required(`${email.requiredErrorMsg}`),
    [jobName.name]: Yup.string().required(`${jobName.requiredErrorMsg}`),
    [jobNumber.name]: Yup.string().required(`${jobNumber.requiredErrorMsg}`),
  }),
  Yup.object().shape({
    // [productionCompanyInfo.name]: Yup.string().required(
    //   `${productionCompanyInfo.requiredErrorMsg}`
    // ),
    [productionCompanyName.name]: Yup.string().required(
      `${productionCompanyName.requiredErrorMsg}`,
    ),
    [billingAddress.name]: Yup.string().required(`${billingAddress.requiredErrorMsg}`),
    [billingCity.name]: Yup.string().required(`${billingCity.requiredErrorMsg}`),
    [billingState.name]: Yup.string().required(`${billingState.requiredErrorMsg}`),
    [billingZipCode.name]: Yup.string().required(`${billingZipCode.requiredErrorMsg}`),
    [billingPhoneNumber.name]: Yup.string().required(`${billingPhoneNumber.requiredErrorMsg}`),
    [emailAddressToReceiveInvoices.name]: Yup.string()
      .email("Invalid email!")
      .required(`${emailAddressToReceiveInvoices.requiredErrorMsg}`),
    [nameOfAuthorizedSignatory.name]: Yup.string().required(
      `${nameOfAuthorizedSignatory.requiredErrorMsg}`,
    ),
    [titleOfAuthorizedSignatory.name]: Yup.string().required(
      `${titleOfAuthorizedSignatory.requiredErrorMsg}`,
    ),
  }),
  Yup.object().shape({
    [cardholderInfo.name]: Yup.string().required(`${cardholderInfo.requiredErrorMsg}`),
    [cardholderName.name]: Yup.string().required(`${cardholderName.requiredErrorMsg}`),
    [cardholderDriversLicenseNumber.name]: Yup.string().required(
      `${cardholderDriversLicenseNumber.requiredErrorMsg}`,
    ),
    [cardholderDriversLicenseState.name]: Yup.string().required(
      `${cardholderDriversLicenseState.requiredErrorMsg}`,
    ),
    [cardholderDriversLicenseExpiry.name]: Yup.string()
      .nullable()
      .required(`${cardholderDriversLicenseExpiry.requiredErrorMsg}`),
    // .test("expDate", cardholderDriversLicenseExpiry.invalidErrorMsg, (val) => {
    //   if (val) {
    //     const startDate = new Date();
    //     if (moment(val, moment.ISO_8601).isValid()) {
    //       return moment(val).isAfter(startDate);
    //     }
    //     return false;
    //   }
    //   return false;
    // }),
  }),
  Yup.object().shape({
    // [creditCardInfo.name]: Yup.string().required(`${creditCardInfo.requiredErrorMsg}`),
    [accountType.name]: Yup.string().required(`${accountType.requiredErrorMsg}`),
    [issuingBank.name]: Yup.string().required(`${issuingBank.requiredErrorMsg}`),
    [cardType.name]: Yup.string().required(`${cardType.requiredErrorMsg}`),
    [cardNumber.name]: Yup.string().required(`${cardNumber.requiredErrorMsg}`),
    [expirationDate.name]: Yup.string().nullable().required(`${expirationDate.requiredErrorMsg}`),
    // .test("expDate", expirationDate.invalidErrorMsg, (val) => {
    //   if (val) {
    //     const startDate = new Date();
    //     if (moment(val, moment.ISO_8601).isValid()) {
    //       return moment(val).isAfter(startDate);
    //     }
    //     return false;
    //   }
    //   return false;
    // }),
    [cvv.name]: Yup.string().when("cardType", {
      is: (val) => val !== "Amex",
      then: (schema) =>
        schema
          .required(`${cvv.requiredErrorMsg}`)
          .test(
            "len",
            `${cvv.invalidErrorMsg}`,
            (val) => val && val.length >= 3 && val.length <= 4,
          ),
      otherwise: (schema) => schema.notRequired(),
    }),
    [fourDigitCID.name]: Yup.string().when("cardType", {
      is: (val) => val === "Amex",
      then: (schema) => schema.required(`${fourDigitCID.requiredErrorMsg}`).length(4),
      otherwise: (schema) => schema.notRequired(),
    }),
  }),
  Yup.object().shape({
    [buyers.name]: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required(`required`),
        title: Yup.string().required(`required`),
        phone: Yup.string().required(`required`),
        email: Yup.string().email("Invalid email!").required(`required`),
      }),
    ),
  }),
  Yup.object().shape({
    // [shippingDetails.name]: Yup.string().required(`${shippingDetails.requiredErrorMsg}`),
    [shippingAccount.name]: Yup.string(),
    [shippingAccountNumber.name]: Yup.string(),
  }),
];

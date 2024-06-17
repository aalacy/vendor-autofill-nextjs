/* eslint-disable import/no-anonymous-default-export */
import * as Yup from "yup";
import checkoutFormModel from "./checkoutFormModel";
const {
  formField: {
    preferredEmailAddress,
    contactName,
    jobName,
    jobNumber,
    prodCoName,
    billAddress,
    billCity,
    billState,
    billZip,
    billPhone,
    invoiceEmail,
    authSignName,
    authSignTitle,
    incorporationStatus,
    cardName,
    cardPhone,
    DLNumber,
    DLState,
    DLExpiry,
    acctType,
    bank,
    cardType,
    cardNumber,
    expDate,
    cvv,
    CID,
    buyers,
    shipAccount,
    shipAccountNumber,
  },
} = checkoutFormModel;

// const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;

export default [
  Yup.object().shape({
    [preferredEmailAddress.name]: Yup.string()
      .email("Invalid email!")
      .required(`${preferredEmailAddress.requiredErrorMsg}`),
    [jobName.name]: Yup.string().required(`${jobName.requiredErrorMsg}`),
    [contactName.name]: Yup.string().required(`${contactName.requiredErrorMsg}`),
    [jobNumber.name]: Yup.string().required(`${jobNumber.requiredErrorMsg}`),
    [prodCoName.name]: Yup.string().required(`${prodCoName.requiredErrorMsg}`),
    [billAddress.name]: Yup.string().required(`${billAddress.requiredErrorMsg}`),
    [billCity.name]: Yup.string().required(`${billCity.requiredErrorMsg}`),
    [billState.name]: Yup.string().required(`${billState.requiredErrorMsg}`),
    [billZip.name]: Yup.string().required(`${billZip.requiredErrorMsg}`),
    [billPhone.name]: Yup.string().required(`${billPhone.requiredErrorMsg}`),
    [invoiceEmail.name]: Yup.string()
      .email("Invalid email!")
      .required(`${invoiceEmail.requiredErrorMsg}`),
    [shipAccountNumber.name]: Yup.string(),
    [incorporationStatus.name]: Yup.bool().oneOf([true], `${incorporationStatus.requiredErrorMsg}`),
  }),
  Yup.object().shape({
    [authSignName.name]: Yup.string().required(`${authSignName.requiredErrorMsg}`),
    [authSignTitle.name]: Yup.string().required(`${authSignTitle.requiredErrorMsg}`),
  }),
  Yup.object().shape({
    // [cardholderInfo.name]: Yup.string().required(`${cardholderInfo.requiredErrorMsg}`),
    [cardName.name]: Yup.string().required(`${cardName.requiredErrorMsg}`),
    [cardPhone.name]: Yup.string().required(`${cardPhone.requiredErrorMsg}`),
    [DLNumber.name]: Yup.string().required(`${DLNumber.requiredErrorMsg}`),
    [DLState.name]: Yup.string().required(`${DLState.requiredErrorMsg}`),
    [DLExpiry.name]: Yup.string().nullable().required(`${DLExpiry.requiredErrorMsg}`),
  }),
  Yup.object().shape({
    [acctType.name]: Yup.string().required(`${acctType.requiredErrorMsg}`),
    [bank.name]: Yup.string().required(`${bank.requiredErrorMsg}`),
    [cardType.name]: Yup.string().required(`${cardType.requiredErrorMsg}`),
    [cardNumber.name]: Yup.string().required(`${cardNumber.requiredErrorMsg}`),
    [expDate.name]: Yup.string().nullable().required(`${expDate.requiredErrorMsg}`),
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
    [CID.name]: Yup.string().when("cardType", {
      is: (val) => val === "Amex",
      then: (schema) => schema.required(`${CID.requiredErrorMsg}`).length(4),
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
    // [shipDetails.name]: Yup.string().required(`${shipDetails.requiredErrorMsg}`),
    [shipAccount.name]: Yup.string(),
  }),
];

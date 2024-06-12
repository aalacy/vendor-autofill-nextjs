/* eslint-disable import/no-anonymous-default-export */
import checkoutFormModel from "./checkoutFormModel";
const {
  formField: {
    preferredEmailAddress,
    contactName,
    jobName,
    jobNumber,
    productionCompanyInfo,
    prodCoName,
    billAddress,
    billCity,
    billState,
    billZip,
    billPhone,
    invoiceEmail,
    authSignName,
    authSignTitle,
    cardholderInfo,
    cardName,
    DLNumber,
    DLState,
    DLExpiry,
    creditCardInfo,
    acctType,
    bank,
    cardType,
    cardNumber,
    cardPhone,
    expDate,
    cvv,
    CID,
    shipDetails,
    shipAccount,
    shipAccountNumber,
  },
} = checkoutFormModel;

export default {
  [preferredEmailAddress.name]: "",
  [contactName.name]: "",
  [jobName.name]: "",
  [jobNumber.name]: "",
  [productionCompanyInfo.name]: "",
  [prodCoName.name]: "",
  [billAddress.name]: "",
  [billCity.name]: "",
  [billState.name]: "",
  [billZip.name]: "",
  [billPhone.name]: "",
  [invoiceEmail.name]: "",
  [authSignName.name]: "",
  [authSignTitle.name]: "",
  [cardholderInfo.name]: "",
  [cardName.name]: "",
  [cardPhone.name]: "",
  [DLNumber.name]: "",
  [DLState.name]: "",
  [DLExpiry.name]: "",
  [creditCardInfo.name]: "",
  [acctType.name]: "",
  [bank.name]: "",
  [cardType.name]: "",
  [cardNumber.name]: "",
  [expDate.name]: "",
  [cvv.name]: "",
  [CID.name]: "",
  buyers: [
    {
      name: "",
      title: "",
      phone: "",
      email: "",
    },
  ],
  [shipDetails.name]: "",
  [shipAccount.name]: "",
  [shipAccountNumber.name]: "",
};

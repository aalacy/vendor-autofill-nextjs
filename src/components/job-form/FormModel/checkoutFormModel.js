/* eslint-disable import/no-anonymous-default-export */

import { ACCOUNT_TYPES, CARD_TYPES, SHIP_ACCOUNTS } from "src/utils/constants";

export default {
  formId: "jobForm",
  formField: {
    preferredEmailAddress: {
      name: "preferredEmailAddress",
      label: "Preferred Email Address*",
      requiredErrorMsg: "Preferred Email Address is required",
    },
    contactName: {
      name: "contactName",
      label: "Contact Name*",
      requiredErrorMsg: "Contact Name is required",
    },
    jobName: {
      name: "jobName",
      label: "Job Name*",
      requiredErrorMsg: "Job Name is required",
    },
    jobNumber: {
      name: "jobNumber",
      label: "Job Number*",
      requiredErrorMsg: "Job Number is required",
    },
    prodCoName: {
      name: "prodCoName",
      label: "Prod Co Name*",
      requiredErrorMsg: "Production Company Name is required",
    },
    billAddress: {
      name: "billAddress",
      label: "Bill Address*",
      requiredErrorMsg: "Bill Address is required",
    },
    billCity: {
      name: "billCity",
      label: "Bill City*",
      requiredErrorMsg: "Bill City is required",
    },
    billState: {
      name: "billState",
      label: "Bill State*",
      requiredErrorMsg: "Bill State is required",
    },
    billZip: {
      name: "billZip",
      label: "Bill Zip*",
      requiredErrorMsg: "Bill Zip is required",
    },
    billPhone: {
      name: "billPhone",
      label: "Bill Phone*",
      requiredErrorMsg: "Bill Phone is required",
    },
    invoiceEmail: {
      name: "invoiceEmail",
      label: "Invoice Email*",
      requiredErrorMsg: "Invoice Email is required",
    },
    shipAccount: {
      name: "shipAccount",
      label: "FedEx / UPS",
      type: "SelectField",
      data: SHIP_ACCOUNTS,
    },
    shipAccountNumber: {
      name: "shipAccountNumber",
      label: "Ship Account Number",
    },
    incorporationStatus: {
      name: "incorporationStatus",
      label: "Incorporation Status",
      type: "CheckboxField",
    },
    authSignName: {
      name: "authSignName",
      label: "Auth Sign Name*",
      requiredErrorMsg: "Auth Sign Name is required",
    },
    authSignTitle: {
      name: "authSignTitle",
      label: "Auth Sign Title*",
      requiredErrorMsg: "Auth Sign Title is required",
    },
    cardName: {
      name: "cardName",
      label: "Card Name*",
      requiredErrorMsg: "Card Name is required",
    },
    DLNumber: {
      name: "DLNumber",
      label: "DL Number*",
      requiredErrorMsg: "DL Number is required",
    },
    DLState: {
      name: "DLState",
      label: "DL State*",
      requiredErrorMsg: "DL State is required",
    },
    DLExpiry: {
      name: "DLExpiry",
      label: "DL Expiry*",
      requiredErrorMsg: "DL Expiry is required",
      type: "DateField",
    },
    cardPhone: {
      name: "cardPhone",
      label: "Card Phone*",
      requiredErrorMsg: "Card Phone is required",
    },
    creditCardInfo: {
      name: "creditCardInfo",
      label: "Credit Card Information*",
      requiredErrorMsg: "Credit Card Information is required",
    },
    acctType: {
      name: "acctType",
      label: "Acct Type*",
      requiredErrorMsg: "Acct Type is required",
      type: "SelectField",
      data: ACCOUNT_TYPES,
    },
    bank: {
      name: "bank",
      label: "Bank*",
      requiredErrorMsg: "Bank is required",
    },
    cardType: {
      name: "cardType",
      label: "Card Type*",
      requiredErrorMsg: "Card Type is required",
      type: "SelectField",
      data: CARD_TYPES,
    },
    cardNumber: {
      name: "cardNumber",
      label: "Card Number*",
      requiredErrorMsg: "Card Number is required",
    },
    expDate: {
      name: "expDate",
      label: "Exp Date*",
      requiredErrorMsg: "Exp Date is required",
      type: "DateField",
    },
    cvv: {
      name: "cvv",
      label: "CVV*",
      requiredErrorMsg: "CVV is required",
      invalidErrorMsg: "CVV must be 3 digit",
    },
    CID: {
      name: "CID",
      label: "CID*",
      requiredErrorMsg: "CID is required",
    },
    buyers: {
      name: "buyers",
      label: "buyers",
    },
    buyerName: {
      name: "buyerName",
      label: "Buyer Name*",
      requiredErrorMsg: "Buyer Name is required",
    },
    buyerTitle: {
      name: "buyerTitle",
      label: "Buyer Title*",
      requiredErrorMsg: "Buyer Title is required",
    },
    buyerPhone: {
      name: "buyerPhone",
      label: "Buyer Phone*",
      requiredErrorMsg: "Buyer Phone is required",
    },
    buyerEmail: {
      name: "buyerEmail",
      label: "Buyer Email*",
      requiredErrorMsg: "Buyer Email is required",
    },
  },
};

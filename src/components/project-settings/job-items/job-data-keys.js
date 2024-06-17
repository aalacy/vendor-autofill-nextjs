export const JobDataKeys = {
  companyInfo: {
    title: "Company Information",
    name: "companyInfo",
    keys: [
      "preferredEmailAddress",
      "contactName",
      "jobName",
      "jobNumber",
      "prodCoName",
      "billAddress",
      "billCity",
      "billState",
      "billZip",
      "billPhone",
      "invoiceEmail",
      "shipAccount",
      "shipAccountNumber",
      "incorporationStatus",
    ],
  },
  authorizedSignatoryInfo: {
    title: "Authorized Signatory Information",
    name: "authorizedSignatoryInfo",
    keys: ["authSignName", "authSignTitle"],
  },
  cardHolderInfo: {
    title: "Cardholder Information",
    name: "cardHolderInfo",
    keys: ["cardName", "DLNumber", "DLState", "DLExpiry", "cardPhone"],
  },
  paymentInfo: {
    title: "Payment Information",
    name: "paymentInfo",
    keys: ["acctType", "bank", "cardType", "cardNumber", "cardPhone", "expDate", "cvv", "CID"],
  },
};

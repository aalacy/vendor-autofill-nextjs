const GREY = "#CCC";
const GREY_LIGHT = "rgba(255, 255, 255, 0.4)";
const GREY_DIM = "#686868";

export const csvUploadStyles = {
  zone: {
    alignItems: "center",
    border: `2px dashed ${GREY}`,
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "center",
    padding: 20,
  },
  file: {
    background: "linear-gradient(to bottom, #EEE, #DDD)",
    borderRadius: 20,
    display: "flex",
    height: 120,
    width: 120,
    position: "relative",
    zIndex: 10,
    flexDirection: "column",
    justifyContent: "center",
  },
  info: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    paddingLeft: 10,
    paddingRight: 10,
  },
  size: {
    backgroundColor: GREY_LIGHT,
    borderRadius: 3,
    marginBottom: "0.5em",
    justifyContent: "center",
    display: "flex",
  },
  name: {
    backgroundColor: GREY_LIGHT,
    borderRadius: 3,
    fontSize: 12,
    marginBottom: "0.5em",
  },
  progressBar: {
    bottom: 14,
    position: "absolute",
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
  },
  zoneHover: {
    borderColor: GREY_DIM,
  },
  default: {
    borderColor: GREY,
  },
  remove: {
    height: 23,
    position: "absolute",
    right: 6,
    top: 6,
    width: 23,
  },
};

export const DepartmentType = ["Construction", "Props", "Set Dec", "Other"];

export const ContractOptions = ["8 hr Days", "10 hr Days", "12 hr Days"];

export const ContractTypes = [
  "cash",
  "po",
  "net 30",
  "credit card",
  "independent contractor",
  "loan out",
];

export const PLAN_LABELS = {
  Monthly: "mo",
  "Bi-Annual": "6mo",
  Annual: "year",
};

export const PLAN_PRICES = {
  monthly: 150,
  "bi-annual": 750,
  annual: 1200,
};

export const StatusEnum = ["active", "inactive"];

export const CreditAuthList = [
  {
    name: "a1 medical",
    script: "a1_medical_credit_auth",
    link: "https://a1props.com/wp-content/uploads/2023/07/A1-Credit-Card-Auth-Form-2023Update.pdf",
  },
  {
    name: "advanced liquidators",
    script: "advanced_liquidators_credit_auth",
    link: "https://advancedliquidators.com/pdf/RentalCreditCardAuthorizationForm.pdf",
  },
  {
    name: "bill ferrell",
    script: "bill_ferrell_credit_auth",
    link: "https://www.billferrell.com/_files/ugd/15f829_f315246833d64be18ae1bc33e75f1c12.pdf",
  },
  {
    name: "gil roy",
    script: "gil_roy_credit_auth",
    link: "https://cdn.shopify.com/s/files/1/1810/9697/files/Gil_Roy_Props_2022_Credit_Card_Authorization.pdf?v=1664121371",
  },
  {
    name: "nest",
    script: "nest_credit_auth",
    link: "http://www.neststudiorentals.net/wp-content/uploads/2020/12/Credit-Card-Authorization-Form.pdf",
  },
  {
    name: "omega cinema",
    script: "omega_cinema_credit_auth",
    link: "https://www.omegacinemaprops.com/files/forms-policies/CCCharge2016.pdf",
  },
  {
    name: "target props",
    script: "target_props_credit_auth",
    link: "https://storage.googleapis.com/propcart-dev.appspot.com/uploads/vendors/targetprops/public/TP-CC-Auth-Form.pdf",
  },
];

export const RentalAgreementList = [
  {
    name: "a1 edical",
    script: "a1_medical_rental_agreement",
    link: "https://a1props.com/wp-content/uploads/2023/07/A1-Rental-Agreement-2023Update.pdf",
  },
  {
    name: "ec props",
    script: "ec_props_rental_agreement",
    link: "https://ecprops.com/includes/rental_agreement_revised_wm_20230424.pdf",
  },
];

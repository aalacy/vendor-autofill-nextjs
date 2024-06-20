import {
  ApartmentOutlined,
  BusinessCenterOutlined,
  CallOutlined,
  LocalAirportOutlined,
  NotListedLocationOutlined,
  PlaceOutlined,
  RestaurantOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";

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
  isDefault: {
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

export const BUSINESS_PURPOSES = [
  {
    value: "Business",
    icon: <BusinessCenterOutlined />,
    isDefault: true,
  },
  {
    value: "Between Offices",
    icon: <ApartmentOutlined />,
    isDefault: true,
  },
  {
    value: "Customer Visit",
    icon: <PlaceOutlined />,
    isDefault: true,
  },
  {
    value: "Meeting",
    icon: <CallOutlined />,
    isDefault: true,
  },
  {
    value: "Errand/Supplies",
    icon: <ShoppingCartOutlined />,
    isDefault: true,
  },
  {
    value: "Meal/Entertain",
    icon: <RestaurantOutlined />,
    isDefault: true,
  },
  {
    value: "Temporary Site",
    icon: <NotListedLocationOutlined />,
    isDefault: true,
  },
  {
    value: "Airport/Travel",
    icon: <LocalAirportOutlined />,
    isDefault: true,
  },
];

export const SHIP_ACCOUNTS = [
  {
    value: "Fedex",
    label: "Fedex",
  },
  {
    value: "UPS",
    label: "UPS",
  },
];

export const ACCOUNT_TYPES = [
  {
    value: "Debit",
    label: "Debit",
  },
  {
    value: "Credit",
    label: "Credit",
  },
];

export const CARD_TYPES = [
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

export const ORDER_TYPES = [
  {
    value: "Invoice",
    label: "Invoice",
  },
  {
    value: "Quote",
    label: "Quote",
  },
  {
    value: "Placeholder",
    label: "Placeholder",
  },
];

// ACH/Wire, Deposit Check, Petty Cash, Credit Card, Will Bill, Addtl.
export const PAYMENT_TYPES = [
  {
    value: "ACH/Wire",
    label: "ACH/Wire",
  },
  {
    value: "Deposit Check",
    label: "Deposit Check",
  },
  {
    value: "Petty Cash",
    label: "Petty Cash",
  },
  {
    value: "Credit Card",
    label: "Credit Card",
  },
  {
    value: "Will Bill",
    label: "Will Bill",
  },
  {
    value: "Addtl",
    label: "Addtl",
  }
];

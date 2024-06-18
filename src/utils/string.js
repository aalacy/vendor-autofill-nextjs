const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

export const beautyDateTime = (date) => (date ? dayjs.utc(date).format("MM/DD/YYYY HH:mm") : "");

export const beautyDate = (date) => (date ? dayjs.utc(date).format("MM/DD/YYYY") : "");

export const beautyExpiry = (date, format = "YYYY/MM") => (date ? dayjs.utc(date).format(format) : "");

export const thisSunday = () => dayjs().startOf("week").add(0, "day");

export const replaceWithBr = (text) => {
  return text.replace(/\t/g, " ").replace(/\n/g, "<br />");
};

export const downloadMedia = (fileName, output) => {
  const anchor = document.createElement("a");
  anchor.href = output;
  anchor.download = fileName;

  // Append to the DOM
  document.body.appendChild(anchor);

  // Trigger `click` event
  anchor.click();

  // Remove element from DOM
  document.body.removeChild(anchor);
};

export const formatLocalNumber = (value) =>
  value ? Number(value.toFixed(2)).toLocaleString("en-US") : "0";

export const sum = (data) => (data.length === 0 ? 0 : data.reduce((a, b) => a + b));

export const splitCamelCase = (str) => {
  return str
    .split(/(?=[A-Z])/)
    .map((word) => String(word).toUpperCase())
    .join(" ");
};

export const formatPhoneNumber = (phoneNumber) => {
  // Remove all non-digit characters from the phone number
  const cleaned = ("" + phoneNumber).replace(/\D/g, "");

  // Check if the phone number has 10 digits
  if (cleaned.length === 10) {
    // Capture the area code, first three digits, last four digits
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    // If the pattern matches, format the number
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
  }

  // if the phone number doesn't match the expected format, return the original input
  return phoneNumber;
};

export const currencyFormatter = (val) => {
  if (!val) return "";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(val);
};

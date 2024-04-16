const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

export const beautyDateTime = (date) => (date ? dayjs.utc(date).format("MM/DD/YYYY HH:mm") : "");

export const beautyDate = (date) => (date ? dayjs.utc(date).format("MM/DD/YYYY") : "");

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

export const sum = (data) =>
  data.length === 0 ? 0 : data.reduce((a, b) => a + b);

export const splitCamelCase = (str) => {
  return str.split(/(?=[A-Z])/).map(word => String(word).toUpperCase()).join(' ');
}
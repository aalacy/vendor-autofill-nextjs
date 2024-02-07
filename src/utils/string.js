const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

export const beautyDateTime = (date) => (date ? dayjs.utc(date).format("MM/DD/YYYY HH:mm") : "");

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
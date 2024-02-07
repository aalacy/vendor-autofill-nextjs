const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

export const beautyDateTime = (date) => (date ? dayjs.utc(date).format("MM/DD/YYYY HH:mm") : "");

export const replaceWithBr = (text) => {
  return text.replace(/\t/g, " ").replace(/\n/g, "<br />");
};

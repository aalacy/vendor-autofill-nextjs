import { v1 as uuidV1 } from "uuid";

export const uuid = () => uuidV1();

/* eslint-disable no-restricted-properties */
export const bytesToSize = (bytes, decimals = 2) => {
  if (bytes === 0) {
    return "0 Bytes";
  }

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export const refineCSVData = (data) => {
  if (data.length < 1) return data;
  if (!data[0].id) return data.map((item, index) => ({ id: index, ...item }));
  return data;
};

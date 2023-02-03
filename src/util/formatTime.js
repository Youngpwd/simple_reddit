import { formatDistance } from "date-fns";

export const formattedTime = (utc) => {
  // console.log(utc); //1675371571
  const createdAt = new Date(utc * 1000);
  // console.log(createdAt); //Fri Feb 03 2023 05:30:37 GMT-0800 (Pacific Standard Time)
  return formatDistance(createdAt, new Date(), { addSuffix: true }); //about 3 hours ago
};

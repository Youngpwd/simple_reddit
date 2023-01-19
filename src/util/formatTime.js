import { formatDistance } from "date-fns";

export const formattedTime = (utc) => {
  const createdAt = utc * 1000;
  return formatDistance(new Date(createdAt), new Date(), { addSuffix: true });
};

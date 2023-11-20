export const convertNumberTimeStampInHoursAndMinutes = (
  number: number,
  is_unix = true
) => {
  const time = new Date(number * (is_unix ? 10000 : 1));

  return time.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

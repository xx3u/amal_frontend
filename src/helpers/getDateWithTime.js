export const getDateWithTime = (date, hours, min) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return new Date(year, month, day, hours, min);
};

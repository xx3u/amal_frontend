export const getDateWithTime = (date, hours, min) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return new Date(Date.UTC(year, month, day, hours, min, 0));
};

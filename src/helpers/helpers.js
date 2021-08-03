export const getWeekdates = (date) => {
  const first = date.getDate() - date.getDay() + 1;
  const last = first + 6;

  const firstday = new Date(date.setDate(first)).toUTCString();
  const lastday = new Date(date.setDate(last)).toUTCString();

  return {
    firstday,
    lastday,
  };
};

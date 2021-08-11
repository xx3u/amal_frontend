export const getWeekdates = (date) => {
  const first = date.getDate() - date.getDay() + 1;
  const last = first + 6;

  const firstDate = new Date(date.setDate(first));
  const lastDate = new Date(date.setDate(last));

  const firstday = new Date(Date.UTC(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate(), 0, 0, 0));

  const lastday = new Date(Date.UTC(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate(), 23, 59, 0));

  return {
    firstday,
    lastday,
  };
};

export const addDays = (date, days) => {
  const curDate = new Date(date);
  const res = new Date();
  res.setDate(curDate.getDate() + days);
  return res;
};

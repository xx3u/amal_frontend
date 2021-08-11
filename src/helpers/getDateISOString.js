export const getDateISOString = (date, hours, minuts) => {
  const hh = hours < 10 ? `0${hours}` : hours;
  const min = minuts < 10 ? `0${minuts}` : minuts;
  let month = date.getMonth() + 1;
  let day = date.getDate();
  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  return `${date.getFullYear()}-${month}-${day}T${hh}:${min}:00.00Z`;
};

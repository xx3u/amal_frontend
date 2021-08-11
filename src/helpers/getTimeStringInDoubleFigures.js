export const getTimeStringInDoubleFigures = (number) => {
  return number < 10 ? `0${number}:00` : `${number}:00`;
};

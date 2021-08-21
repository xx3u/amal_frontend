import { startOfWeek, lastDayOfWeek } from 'date-fns';

export const getWeekdates = (date) => {
  const firstDate = startOfWeek(date, { weekStartsOn: 1 });
  const lastDate = lastDayOfWeek(date, { weekStartsOn: 1 });

  const firstday = new Date(Date.UTC(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate(), 0, 0, 0));

  const lastday = new Date(Date.UTC(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate(), 23, 59, 0));

  return {
    firstday,
    lastday,
  };
};

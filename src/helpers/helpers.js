<<<<<<< HEAD
import { useSelector } from 'react-redux';

export const getWeekdates = (date) => {
  const first = date.getDate() - date.getDay() + 1;
  const last = first + 6;
=======
import { startOfWeek, lastDayOfWeek } from 'date-fns';
>>>>>>> 48d42ff2abdeeecaefcea721e71501cc6e91ae7a

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

export const getUnauthorizedError = () => {
  return useSelector(
    (state) =>
      state.students.error === 'Unauthorized' ||
      state.groups.error === 'Unauthorized' ||
      state.lessons.error === 'Unauthorized' ||
      state.streams.error === 'Unauthorized' ||
      state.subjects.error === 'Unauthorized' ||
      state.teachers.error === 'Unauthorized'
  );
};

const getLessons = (state) => {
  return state.lessons.lessons;
};

export const getTeachersfromLessons = (state) => {
  return Object.values(
    getLessons(state).reduce((acc, lesson) => {
      const teacherId = lesson.teacherId;
      return {
        ...acc,
        [teacherId]: { id: lesson.teacherId, fullName: `${lesson.Teacher.lastName} ${lesson.Teacher.firstName}` },
      };
    }, {})
  );
};

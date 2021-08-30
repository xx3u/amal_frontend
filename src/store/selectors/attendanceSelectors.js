export const selectLessons = (state) => state.lessons.lessons;

export const selectLessonsParams = (state) => state.lessons.lessonsParams;

export const selectStudents = (state) => state.lessons.lessonsParams.selectedGroup?.Students || [];

export const getTeachersfromLessons = (state) => {
  return Object.values(
    selectLessons(state).reduce((acc, lesson) => {
      const teacherId = lesson.teacherId;
      return {
        ...acc,
        [teacherId]: { id: lesson.teacherId, fullName: `${lesson.Teacher.lastName} ${lesson.Teacher.firstName}` },
      };
    }, {})
  );
};

const checkIfUserIsTeacher = (userId, teachers) => {
  const found = teachers.find((t) => t.teacherId === userId);
  if (found) {
    return true;
  } else {
    return false;
  }
};
export default checkIfUserIsTeacher;

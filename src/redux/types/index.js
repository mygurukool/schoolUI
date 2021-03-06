// export const RootUrl = "http://192.168.0.104:3005";

export const authTypes = {
  LOCAL_LOGIN: "LOCAL_LOGIN",
  LOCAL_LOGIN_SUCCESS: "LOCAL_LOGIN_SUCCESS",
  LOCAL_LOGIN_FAIL: "LOCAL_LOGIN_FAIL",

  SET_LOCAL_LOGIN: "SET_LOCAL_LOGIN",

  LOGIN_USER: "LOGIN_USER",
  LOGIN_USER_SUCCESS: "LOGIN_USER_SUCCESS",
  LOGIN_USER_FAIL: "LOGIN_USER_FAIL",

  GET_USER_DETAILS: "GET_USER_DETAILS",
  GET_USER_DETAILS_SUCCESS: "GET_USER_DETAILS_SUCCESS",
  GET_USER_DETAILS_FAIL: "GET_USER_DETAILS_FAIL",

  LOGOUT_USER: "LOGOUT_USER",
};

export const groupTypes = {
  GET_GROUP: "GET_GROUP",
  GET_GROUP_SUCCESS: "GET_GROUP_SUCCESS",
  GET_GROUP_FAIL: "GET_GROUP_FAIL",

  CREATE_GROUP: "CREATE_GROUP",
  CREATE_GROUP_SUCCESS: "CREATE_GROUP_SUCCESS",
  CREATE_GROUP_FAIL: "CREATE_GROUP_FAIL",

  EDIT_GROUP: "EDIT_GROUP",
  EDIT_GROUP_SUCCESS: "EDIT_GROUP_SUCCESS",
  EDIT_GROUP_FAIL: "EDIT_GROUP_FAIL",

  DELETE_GROUP: "DELETE_GROUP",
  DELETE_GROUP_SUCCESS: "DELETE_GROUP_SUCCESS",
  DELETE_GROUP_FAIL: "DELETE_GROUP_FAIL",
};

export const courseTypes = {
  GET_COURSE: "GET_COURSE",
  GET_COURSE_SUCCESS: "GET_COURSE_SUCCESS",
  GET_COURSE_FAIL: "GET_COURSE_FAIL",

  CREATE_COURSE: "CREATE_COURSE",
  CREATE_COURSE_SUCCESS: "CREATE_COURSE_SUCCESS",
  CREATE_COURSE_FAIL: "CREATE_COURSE_FAIL",

  EDIT_COURSE: "EDIT_COURSE",
  EDIT_COURSE_SUCCESS: "EDIT_COURSE_SUCCESS",
  EDIT_COURSE_FAIL: "EDIT_COURSE_FAIL",

  DELETE_COURSE: "DELETE_COURSE",
  DELETE_COURSE_SUCCESS: "DELETE_COURSE_SUCCESS",
  DELETE_COURSE_FAIL: "DELETE_COURSE_FAIL",
};

export const assignmentTypes = {
  GET_ASSIGMENT: "GET_ASSIGMENT",
  GET_ASSIGMENT_SUCCESS: "GET_ASSIGMENT_SUCCESS",
  GET_ASSIGMENT_FAIL: "GET_ASSIGMENT_FAIL",

  CREATE_ASSIGMENT: "CREATE_ASSIGMENT",
  CREATE_ASSIGMENT_SUCCESS: "CREATE_ASSIGMENT_SUCCESS",
  CREATE_ASSIGMENT_FAIL: "CREATE_ASSIGMENT_FAIL",

  EDIT_ASSIGMENT: "EDIT_ASSIGMENT",
  EDIT_ASSIGMENT_SUCCESS: "EDIT_ASSIGMENT_SUCCESS",
  EDIT_ASSIGMENT_FAIL: "EDIT_ASSIGMENT_FAIL",

  DELETE_ASSIGMENT: "DELETE_ASSIGMENT",
  DELETE_ASSIGMENT_SUCCESS: "DELETE_ASSIGMENT_SUCCESS",
  DELETE_ASSIGMENT_FAIL: "DELETE_ASSIGMENT_FAIL",

  DELETE_UPLOADED_FILE: "DELETE_UPLOADED_FILE",
  DELETE_UPLOADED_FILE_SUCCESS: "DELETE_UPLOADED_FILE_SUCCESS",
  DELETE_UPLOADED_FILE_FAIL: "DELETE_UPLOADED_FILE_FAIL",

  GET_STUDENT_FILES: "GET_STUDENT_FILES",
  GET_STUDENT_FILES_SUCCESS: "GET_STUDENT_FILES_SUCCESS",
  GET_STUDENT_FILES_FAIL: "GET_STUDENT_FILES_FAIL",
};

export const teacherTypes = {
  GET_TEACHERS: "GET_TEACHERS",
  GET_TEACHERS_SUCCESS: "GET_TEACHERS_SUCCESS",
  GET_TEACHERS_FAIL: "GET_TEACHERS_FAIL",

  REMOVE_TEACHER: "REMOVE_TEACHER",
  REMOVE_TEACHER_SUCCESS: "REMOVE_TEACHER_SUCCESS",
  REMOVE_TEACHER_FAIL: "REMOVE_TEACHER_FAIL",

  GIVE_MARKS: "GIVE_MARKS",
  GIVE_MARKS_SUCCESS: "GIVE_MARKS_SUCCESS",
  GIVE_MARKS_FAIL: "GIVE_MARKS_FAIL",
};

export const studentTypes = {
  GET_STUDENTS: "GET_STUDENTS",
  GET_STUDENTS_SUCCESS: "GET_STUDENTS_SUCCESS",
  GET_STUDENTS_FAIL: "GET_STUDENTS_FAIL",

  REMOVE_STUDENT: "REMOVE_STUDENT",
  REMOVE_STUDENT_SUCCESS: "REMOVE_STUDENT_SUCCESS",
  REMOVE_STUDENT_FAIL: "REMOVE_STUDENT_FAIL",

  UPLOAD_EXCERCISE_FILE: "UPLOAD_EXCERCISE_FILE",
  UPLOAD_EXCERCISE_FILE_SUCCESS: "UPLOAD_EXCERCISE_FILE_SUCCESS",
  UPLOAD_EXCERCISE_FILE_FAIL: "UPLOAD_EXCERCISE_FILE_FAIL",

  DELETE_EXCERCISE_FILE: "DELETE_EXCERCISE_FILE",
  DELETE_EXCERCISE_FILE_SUCCESS: "DELETE_EXCERCISE_FILE_SUCCESS",
  DELETE_EXCERCISE_FILE_FAIL: "DELETE_EXCERCISE_FILE_FAIL",
};

export const commonTypes = {
  INVITE_PEOPLE: "INVITE_PEOPLE",
  INVITE_PEOPLE_SUCCESS: "INVITE_PEOPLE_SUCCESS",
  INVITE_PEOPLE_FAIL: "INVITE_PEOPLE_FAIL",

  GET_SUBMISSION: "GET_SUBMISSION",
  GET_SUBMISSION_SUCCESS: "GET_SUBMISSION_SUCCESS",
  GET_SUBMISSION_FAIL: "GET_SUBMISSION_FAIL",

  GET_INVITATION_DETAILS: "GET_INVITATION_DETAILS",
  GET_INVITATION_DETAILS_SUCCESS: "GET_INVITATION_DETAILS_SUCCESS",
  GET_INVITATION_DETAILS_FAIL: "GET_INVITATION_DETAILS_FAIL",

  ACCEPT_INVITATION: "ACCEPT_INVITATION",
  ACCEPT_INVITATION_SUCCESS: "ACCEPT_INVITATION_SUCCESS",
  ACCEPT_INVITATION_FAIL: "ACCEPT_INVITATION_FAIL",

  GET_ASSIGNMENTS: "GET_ASSIGNMENTS",
  GET_ASSIGNMENTS_SUCCESS: "GET_ASSIGNMENTS_SUCCESS",
  GET_ASSIGNMENTS_FAIL: "GET_ASSIGNMENTS_FAIL",

  SET_CURRENT_GROUP: "SET_CURRENT_GROUP",
  REMOVE_CURRENT_GROUP: "REMOVE_CURRENT_GROUP",

  SET_CURRENT_COURSE: "SET_CURRENT_COURSE",
  REMOVE_CURRENT_COURSE: "REMOVE_CURRENT_COURSE",

  REMOVE_ASSIGNMENT_DATA: "REMOVE_ASSIGNMENT_DATA",

  SET_A_MESSAGE: "SET_A_MESSAGE",

  SET_MESSAGES: "SET_MESSAGES",

  SET_OLDER_MESSAGES: "SET_OLDER_MESSAGES",

  CLEAN_MESSAGES: "CLEAN_MESSAGES",
};

export const eventTypes = {
  GET_EVENTS: "GET_EVENTS",
  GET_EVENTS_SUCCESS: "GET_EVENTS_SUCCESS",
  GET_EVENTS_FAIL: "GET_EVENTS_FAIL",

  CREATE_EVENT: "CREATE_EVENT",
  CREATE_EVENT_SUCCESS: "CREATE_EVENT_SUCCESS",
  CREATE_EVENT_FAIL: "CREATE_EVENT_FAIL",

  EDIT_EVENT: "EDIT_EVENT",
  EDIT_EVENT_SUCCESS: "EDIT_EVENT_SUCCESS",
  EDIT_EVENT_FAIL: "EDIT_EVENT_FAIL",

  DELETE_EVENT: "DELETE_EVENT",
  DELETE_EVENT_SUCCESS: "DELETE_EVENT_SUCCESS",
  DELETE_EVENT_FAIL: "DELETE_EVENT_FAIL",

  CHANGE_EVENT_JOINING_STATUS: "CHANGE_EVENT_JOINING_STATUS",
  CHANGE_EVENT_JOINING_STATUS_SUCCESS: "CHANGE_EVENT_JOINING_STATUS_SUCCESS",
  CHANGE_EVENT_JOINING_STATUS_FAIL: "CHANGE_EVENT_JOINING_STATUS_FAIL",
};

export const userTypes = {
  CREATE_USER: "CREATE_USER",
  CREATE_USER_SUCCESS: "CREATE_USER_SUCCESS",
  CREATE_USER_FAIL: "CREATE_USER_FAIL",

  UPDATE_USER: "UPDATE_USER",
  UPDATE_USER_SUCCESS: "UPDATE_USER_SUCCESS",
  UPDATE_USER_FAIL: "UPDATE_USER_FAIL",

  GET_ALL_USERS: "GET_ALL_USERS",
  GET_ALL_USERS_SUCCESS: "GET_ALL_USERS_SUCCESS",
  GET_ALL_USERS_FAIL: "GET_ALL_USERS_FAIL",

  DELETE_USER: "DELETE_USER",
  DELETE_USER_SUCCESS: "DELETE_USER_SUCCESS",
  DELETE_USER_FAIL: "DELETE_USER_FAIL",

  SET_USER_AS_TEACHER: "SET_USER_AS_TEACHER",
  REMOVE_USER_AS_TEACHER: "REMOVE_USER_AS_TEACHER",
};

export const utilTypes = {
  TOGGLE_DRAWER: "TOGGLE_DRAWER",

  TOGGLE_GUIDE: "TOGGLE_GUIDE",

  TOGGLE_WELCOME_GUIDE: "TOGGLE_WELCOME_GUIDE",

  SET_MESSAGES: "SET_MESSAGES",

  TOGGLE_FULL_SCREEN: "TOGGLE_FULL_SCREEN",

  OPEN_MODAL: "OPEN_MODAL",

  CLOSE_MODAL: "CLOSE_MODAL",

  OPEN_SUBMISSION_MODAL: "OPEN_SUBMISSION_MODAL",

  CLOSE_SUBMISSION_MODAL: "CLOSE_SUBMISSION_MODAL",

  REGISTER_NOTIFICATION_TOKEN: "REGISTER_NOTIFICATION_TOKEN",
  SET_NOTIFICATION_MESSAGE: "SET_NOTIFICATION_MESSAGE",
  REMOVE_NOTIFICATION_MESSAGE: "REMOVE_NOTIFICATION_MESSAGE",

  GE_FILE: "GE_FILE",
  GE_FILE_SUCCESS: "GE_FILE_SUCCESS",
  GE_FILE_FAIL: "GE_FILE_FAIL",
};

export const organizationTypes = {
  CREATE_ORGANIZATION: "CREATE_ORGANIZATION",
  CREATE_ORGANIZATION_SUCCESS: "CREATE_ORGANIZATION_SUCCESS",
  CREATE_ORGANIZATION_FAIL: "CREATE_ORGANIZATION_FAIL",
};

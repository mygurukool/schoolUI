import { studentTypes } from "../types";
import studentApi from "../api/studentApi";

export const getAllStudents = (data) => {
  return {
    type: studentTypes.GET_STUDENTS,
    payload: {
      request: {
        url: studentApi.GET_STUDENTS,
        method: "get",
        params: data,
      },
    },
  };
};

export const removeStudent = (data, cb, errorCb) => {
  return {
    type: studentTypes.REMOVE_STUDENT,
    payload: {
      request: {
        url: studentApi.REMOVE_STUDENT,
        method: "delete",
        params: data,
      },
      successMessage: "Student removed successfully",
      errorMessage: "Failed to remove student",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
    },
  };
};

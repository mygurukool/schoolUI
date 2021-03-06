import { teacherTypes } from "../types";
import groupApi from "../api/groupApi";
import teacherApi from "../api/teacherApi";

export const getAllTeachers = (data) => {
  return {
    type: teacherTypes.GET_TEACHERS,
    payload: {
      request: {
        url: teacherApi.GET_TEACHERS,
        method: "get",
        params: data,
      },
    },
  };
};

export const removeTeacher = (data, cb, errorCb) => {
  return {
    type: teacherTypes.REMOVE_TEACHER,
    payload: {
      request: {
        url: teacherApi.REMOVE_TEACHER,
        method: "delete",
        params: data,
      },
      successMessage: "Teacher removed successfully",
      errorMessage: "Failed to remove teacher",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
    },
  };
};

export const giveMarks = (data, cb, errorCb) => {
  return {
    type: teacherTypes.GIVE_MARKS,
    payload: {
      request: {
        url: teacherApi.GIVE_MARKS,
        method: "post",
        data: data,
      },
      successMessage: "Marks added successfully",
      errorMessage: "Failed to add teacher",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
    },
  };
};

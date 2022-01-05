import { courseTypes } from "../types";
import courseApi from "../api/courseApi";

export const getAllCourses = (data) => {
  return {
    type: courseTypes.GET_COURSE,
    payload: {
      request: {
        url: courseApi.GET_COURSES,
        method: "get",
        params: data,
      },
    },
  };
};

export const createCourse = (data, cb, errorCb) => {
  return {
    type: courseTypes.CREATE_COURSE,
    payload: {
      request: {
        url: courseApi.CREATE_COURSE,
        method: "post",
        data: data,
      },
      successMessage: "Course Added successfully",
      errorMessage: "Failed to add course",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
    },
  };
};

export const editCourse = (data, cb, errorCb) => {
  return {
    type: courseTypes.EDIT_COURSE,
    payload: {
      request: {
        url: courseApi.EDIT_COURSE,
        method: "put",
        data: data,
      },
      successMessage: "Course edited successfully",
      errorMessage: "Failed to edit course",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
    },
  };
};

export const deleteCourse = (data, cb, errorCb) => {
  return {
    type: courseTypes.DELETE_COURSE,
    payload: {
      request: {
        url: courseApi.DELETE_COURSE,
        method: "delete",
        data: data,
      },
      successMessage: "Group deleted successfully",
      errorMessage: "Failed to delete course",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
    },
  };
};

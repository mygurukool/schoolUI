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

export const uploadExcerciseFile = (data, cb, errorCb) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });
  return {
    type: studentTypes.UPLOAD_EXCERCISE_FILE,
    payload: {
      request: {
        url: studentApi.UPLOAD_EXCERSICE_FILE,
        method: "POST",
        data: formData,
        headers: {
          "Content-type": "application/json",
        },
      },
      successMessage: "File Uploaded successfully",
      errorMessage: "Failed to upload file",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
    },
  };
};

export const deleteExcerciseFile = (data, cb, errorCb) => {
  return {
    type: studentTypes.DELETE_EXCERCISE_FILE,
    payload: {
      request: {
        url: studentApi.DELETE_EXCERSICE_FILE,
        method: "delete",
        params: data,
      },
      successMessage: "File deleted successfully",
      errorMessage: "Failed to delete file",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
    },
  };
};

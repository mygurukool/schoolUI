import assignmentApi from "../api/assignmentApi";
import { assignmentTypes } from "../types";

export const getAssignments = (data, cb, errorCb) => {
  return {
    type: assignmentTypes.GET_ASSIGMENT,
    payload: {
      request: {
        url: assignmentApi.GET_ASSIGNMENTS,
        method: "get",
        params: {
          courseId: data,
        },
      },
      enableMessage: false,
      cb: cb,
      errorCb: errorCb,
    },
  };
};

export const createAssignmet = (data, cb, errorCb) => {
  return {
    type: assignmentTypes.CREATE_ASSIGMENT,
    payload: {
      request: {
        url: assignmentApi.CREATE_ASSIGNMENT,
        method: "post",
        data: data,
      },
      successMessage: "Assignmet Added successfully",
      errorMessage: "Failed to add assignment",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
    },
  };
};

export const editAssignmet = (data, cb, errorCb) => {
  return {
    type: assignmentTypes.EDIT_ASSIGMENT,
    payload: {
      request: {
        url: assignmentApi.EDIT_ASSIGNMENT,
        method: "put",
        data: data,
      },
      successMessage: "Assignmet edited successfully",
      errorMessage: "Failed to edit assignment",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
    },
  };
};

export const deleteAssignmet = (data, cb, errorCb) => {
  return {
    type: assignmentTypes.DELETE_ASSIGMENT,
    payload: {
      request: {
        url: assignmentApi.DELETE_ASSIGNMENT,
        method: "delete",
        data: data,
      },
      successMessage: "Assignmet deleted successfully",
      errorMessage: "Failed to delete assignment",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
    },
  };
};

import { groupTypes } from "../types";
import groupApi from "../api/groupApi";

export const getAllGroups = (data) => {
  return {
    type: groupTypes.GET_GROUP,
    payload: {
      request: {
        url: groupApi.GET_GROUPS,
        method: "get",
        params: data,
      },
    },
  };
};

export const createGroup = (data, cb, errorCb) => {
  return {
    type: groupTypes.CREATE_GROUP,
    payload: {
      request: {
        url: groupApi.CREATE_GROUP,
        method: "post",
        data: data,
      },
      successMessage: "Group Added successfully",
      errorMessage: "Failed to add group",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
    },
  };
};

export const editGroup = (data, cb, errorCb) => {
  return {
    type: groupTypes.EDIT_GROUP,
    payload: {
      request: {
        url: groupApi.EDIT_GROUP,
        method: "put",
        data: data,
      },
      successMessage: "Group edited successfully",
      errorMessage: "Failed to edit group",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
    },
  };
};

export const deleteGroup = (data, cb, errorCb) => {
  return {
    type: groupTypes.DELETE_GROUP,
    payload: {
      request: {
        url: groupApi.DELETE_GROUP,
        method: "delete",
        data: data,
      },
      successMessage: "Group deleted successfully",
      errorMessage: "Failed to delete group",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
    },
  };
};

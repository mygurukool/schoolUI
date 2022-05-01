import organizationApi from "../api/organizationApi";
import { organizationTypes } from "../types";

export const createOrganization = (data, cb, errorCb) => {
  return {
    type: organizationTypes.CREATE_ORGANIZATION,
    payload: {
      request: {
        url: organizationApi.CREATE_ORGANIZATION,
        method: "post",
        data: data,
      },
      enableMessage: true,
      successMessage: "Organization created successfully",
      errorMessage: "Failed to create organization",

      cb: cb,
      errorCb: errorCb,
    },
  };
};

export const changeUploadPermission = (data, cb, errorCb) => {
  return {
    type: organizationTypes.CHANGE_UPLOAD_PERMISSION,
    payload: {
      request: {
        url: organizationApi.CHANGE_UPLOAD_PERMISSION,
        method: "post",
        data: data,
      },
      successMessage: "Permission changed successfully",
      errorMessage: "Failed to change permission",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
    },
  };
};

export const checkUploadPermission = (data, cb, errorCb) => {
  return {
    type: organizationTypes.CHECK_UPLOAD_PERMISSION,
    payload: {
      request: {
        url: organizationApi.CHECK_UPLOAD_PERMISSION,
        method: "get",
        data: {
          organizationId: data,
        },
      },
      successMessage: "Permission changed successfully",
      errorMessage: "Failed to change permission",
      enableMessage: false,
      cb: cb,
      errorCb: errorCb,
    },
  };
};

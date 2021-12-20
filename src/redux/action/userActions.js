/* global gapi */
import authApi from "../api/authApi";
import userApi from "../api/userApi";
import { authTypes, userTypes } from "../types";
import checkIfAsyncReqSuccess from "./checkIfAsyncReqSuccess";

export const loginUser = (data, cb, errorCb) => {
  return {
    type: authTypes.LOGIN_USER,
    payload: {
      request: {
        url: authApi.LOGIN_USER,
        method: "post",
        data: data,
      },
      successMessage: "Login Succcess",
      errorMessage: "Failed to Login",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
    },
  };
};

export const getUserDetails = (data, cb, errorCb) => {
  return {
    type: authTypes.GET_USER_DETAILS,
    payload: {
      request: {
        url: authApi.GET_USER_DETAILS,
        method: "get",
        data: data,
      },
      successMessage: "Login Succcess",
      errorMessage: "Failed to Login",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
    },
  };
};

export const logoutUser = () => {
  return {
    type: authTypes.LOGOUT_USER,
  };
};

export const setLocalLogin = ({ loginType }) => {
  return {
    type: authTypes.SET_LOCAL_LOGIN,
    payload: loginType,
  };
};

export const setUserAsTeacher = () => {
  return {
    type: userTypes.SET_USER_AS_TEACHER,
  };
};
export const removeUserAsTeacher = () => {
  return {
    type: userTypes.REMOVE_USER_AS_TEACHER,
  };
};

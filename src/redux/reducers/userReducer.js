/* global gapi */

import { userTypes, authTypes, organizationTypes } from "../types";
import setToken from "../../helpers/setToken";
import removeToken from "../../helpers/removeToken";
import { ROLES } from "../../constants";

const initialstate = {
  isLogged: false,
  getDetailsLoading: false,
  token: undefined,
  closeModal: false,
  loginType: undefined,
  // sectionBg: "/images/bg.jpg",
  sectionBg: "/background/home.jpg",
  isTeacher: false,
  organization: undefined,
  isGoogleLogin: false,
  isMicrosoftLogin: false,
};

const checkIfTeacher = (role) => {
  return [ROLES.organizationOwner, ROLES.teacher].includes(role);
};

const sizeReducer = (state = initialstate, action) => {
  const getData = () => action?.payload?.data;

  switch (action.type) {
    case authTypes.LOGIN_USER:
      return {
        ...state,
        isLoading: true,
        error: undefined,
      };

    case authTypes.LOGIN_USER_SUCCESS:
      setToken(getData().token, getData().loginType);
      return {
        ...state,
        isLoading: false,
        isLogged: true,
        role: getData().user.role,
        name: getData().user.name,
        token: getData().token,
        isTeacher: checkIfTeacher(getData().user.role),

        ...getData().user,
        organization: getData().organization,
        isGoogleLogin: getData().loginType === "google",
        isMicroSoftLogin: getData().loginType === "microsoft",
      };

    case authTypes.LOGIN_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        isLogged: false,
        error: {
          message: action?.error?.response?.data?.message,
          status: "error",
        },
      };

    case authTypes.SET_LOCAL_LOGIN:
      return {
        ...state,
        isLogged: true,
        loginType: action.payload,
      };

    case authTypes.GET_USER_DETAILS_SUCCESS:
      console.log("isTeacher", checkIfTeacher(getData().user.role));
      return {
        ...state,
        isLogged: true,
        isLoading: false,
        getDetailsLoading: false,
        role: getData()?.user?.role,
        name: getData()?.user?.name,
        isTeacher: checkIfTeacher(getData().user.role),

        error: undefined,
        ...getData()?.user,
        loginType: getData().loginType,
        organization: getData().organization,
        isGoogleLogin: getData().loginType === "google",
        isMicroSoftLogin: getData().loginType === "microsoft",
      };

    case userTypes.GET_USER_DETAILS_FAIL:
      return {
        ...state,
        isLogged: false,

        isLoading: false,
        getDetailsLoading: false,
        error: {
          message: action?.error?.response?.data?.message,
          status: "error",
        },
      };

    case userTypes.SET_USER_AS_TEACHER:
      return {
        ...state,
        isTeacher: true,
      };

    case userTypes.REMOVE_USER_AS_TEACHER:
      return {
        ...state,
        isTeacher: false,
      };

    case authTypes.LOGOUT_USER:
      removeToken();
      return initialstate;

    default:
      return state;
  }
};

export default sizeReducer;

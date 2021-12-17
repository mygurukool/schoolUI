/* global gapi */

import { userTypes, authTypes, organizationTypes } from "../types";
import setToken from "../../helpers/setToken";
import removeToken from "../../helpers/removeToken";

const initialstate = {
  isLogged: false,
  getDetailsLoading: false,
  token: undefined,
  closeModal: false,
  loginType: undefined,
  // sectionBg: "/images/bg.jpg",
  sectionBg: "/background/bg3.jpeg",
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
      // setToken(getData().token);
      return {
        ...state,
        isLoading: false,
        isLogged: true,
        role: getData().user.role,
        name: getData().user.name,
        token: getData().token,
        ...getData().user,
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
      return {
        ...state,
        isLogged: true,
        isLoading: false,
        getDetailsLoading: false,
        role: getData()?.user?.role,
        name: getData()?.user?.name,
        error: undefined,
        ...getData()?.user,
      };

    case userTypes.GET_USER_DETAILS_FAIL:
      return {
        ...state,
        // isLogged: false,

        isLoading: false,
        getDetailsLoading: false,
        error: {
          message: action?.error?.response?.data?.message,
          status: "error",
        },
      };

    case authTypes.LOGOUT_USER:
      removeToken();
      return initialstate;

    default:
      return state;
  }
};

export default sizeReducer;

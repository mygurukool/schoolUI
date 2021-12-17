import { utilTypes } from "../types";

export const setLoginType = (data) => {
  return {
    type: utilTypes.LOGIN_TYPE,
    payload: {
      data: data,
    },
  };
};

export const openModal = (data) => {
  return {
    type: utilTypes.OPEN_MODAL,
    payload: data,
  };
};

export const closeModal = () => {
  return {
    type: utilTypes.CLOSE_MODAL,
  };
};

export const setMessages = (data) => {
  return {
    type: utilTypes.SET_MESSAGES,
    payload: data,
  };
};

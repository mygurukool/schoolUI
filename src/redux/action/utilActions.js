import { utilTypes } from "../types";

export const setLoginType = (data) => {
  return {
    type: utilTypes.LOGIN_TYPE,
    payload: {
      data: data,
    },
  };
};

export const openModal = (value, data) => {
  return {
    type: utilTypes.OPEN_MODAL,
    payload: {
      value: value,
      data: data,
    },
  };
};

export const closeModal = () => {
  return {
    type: utilTypes.CLOSE_MODAL,
  };
};

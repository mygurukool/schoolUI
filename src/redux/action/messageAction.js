import { commonTypes } from "../types";

export const setSingleMessage = (data) => {
  return {
    type: commonTypes.SET_A_MESSAGE,
    payload: data,
  };
};

export const setMessages = (data) => {
  return {
    type: commonTypes.SET_MESSAGES,
    payload: data,
  };
};

export const setOlderMessages = (data) => {
  return {
    type: commonTypes.SET_OLDER_MESSAGES,
    payload: data,
  };
};

export const cleanMessages = (data) => {
  return {
    type: commonTypes.CLEAN_MESSAGES,
    payload: data,
  };
};

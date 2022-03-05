import utilApi from "../api/utilApi";
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

export const openSubmissionModal = (value, data) => {
  return {
    type: utilTypes.OPEN_SUBMISSION_MODAL,
    payload: {
      value: value,
      data: data,
    },
  };
};
export const closeSubmissionModal = () => {
  return {
    type: utilTypes.CLOSE_SUBMISSION_MODAL,
  };
};
export const toggleGuide = () => {
  return {
    type: utilTypes.TOGGLE_GUIDE,
  };
};

export const toggleWelcomeGuide = () => {
  return {
    type: utilTypes.TOGGLE_WELCOME_GUIDE,
  };
};

export const setNotificationMessage = (data) => {
  return {
    type: utilTypes.SET_NOTIFICATION_MESSAGE,
    payload: data,
  };
};
export const registerNotificationToken = (data) => {
  return {
    type: utilTypes.REGISTER_NOTIFICATION_TOKEN,
    payload: {
      request: {
        url: utilApi.REGISTER_TOKEN,
        method: "POST",
        data: {
          token: data,
        },
      },
    },
  };
};

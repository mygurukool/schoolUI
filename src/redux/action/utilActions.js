import { utilTypes } from "../types";

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

export const pricingSelection = (data) => {
  return {
    type: utilTypes.PRICING_SELECTION,
    payload: data,
  };
};

export const subjectSelection = (data) => {
  return {
    type: utilTypes.SUBJECT_SELECTION,
    payload: data,
  };
};

export const submitContact = (data, cb, errorCb) => {
  return {
    type: utilTypes.SUBMIT_CONTACT,
    payload: {
      request: {
        url: '/contact/submitdetails',
        method: "post",
        data: data,
      },
      successMessage: "Details submitted successfully",
      errorMessage: "Failed to submit details",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
    },
  };
};

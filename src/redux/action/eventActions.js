import eventApi from "../api/eventsApi";
import { eventTypes, commonTypes } from "../types";

export const getEvents = (data, cb, errorCb) => {
  return {
    type: eventTypes.GET_EVENTS,
    payload: {
      request: {
        url: eventApi.GET_EVENTS,
        method: "get",
        params: data,
      },
      enableMessage: false,
      cb: cb,
      errorCb: errorCb,
    },
  };
};

export const createEvent = (data, cb, errorCb) => {
  return {
    type: eventTypes.CREATE_EVENT,
    payload: {
      request: {
        url: eventApi.CREATE_EVENT,
        method: "post",
        data: data,
      },
      successMessage: "Event Added successfully",
      errorMessage: "Failed to add Event",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
    },
  };
};

export const editEvent = (data, cb, errorCb) => {
  return {
    type: eventTypes.EDIT_EVENT,
    payload: {
      request: {
        url: eventApi.EDIT_EVENT,
        method: "put",
        data: data,
      },
      successMessage: "Event edited successfully",
      errorMessage: "Failed to edit Event",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
    },
  };
};

export const deleteEvent = (id, cb, errorCb) => {
  return {
    type: eventTypes.DELETE_EVENT,
    payload: {
      request: {
        url: eventApi.DELETE_EVENT,
        method: "delete",
        data: { id: id },
      },
      successMessage: "Event deleted successfully",
      errorMessage: "Failed to delete Event",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
    },
  };
};

export const changeEventJoiningStatus = (data, cb, errorCb) => {
  return {
    type: eventTypes.CHANGE_EVENT_JOINING_STATUS,
    payload: {
      request: {
        url: eventApi.CHANGE_EVENT_JOINING_STATUS,
        method: "post",
        data: data,
      },
      successMessage: "Event status changed successfully",
      errorMessage: "Failed to change Event status",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
    },
  };
};

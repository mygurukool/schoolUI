import { commonTypes } from "../types";
import inviteApi from "../api/inviteApi";

export const removeAssignmentData = () => {
  return {
    type: commonTypes.REMOVE_ASSIGNMENT_DATA,
  };
};

export const setCurrentGroup = (group) => {
  return {
    type: commonTypes.SET_CURRENT_GROUP,
    payload: group,
  };
};

export const removeCurrentGroup = () => {
  return {
    type: commonTypes.REMOVE_CURRENT_GROUP,
  };
};

export const setCurrentCourse = (course) => {
  return {
    type: commonTypes.SET_CURRENT_COURSE,
    payload: course,
  };
};

export const removeCurrentCourse = () => {
  return {
    type: commonTypes.REMOVE_CURRENT_COURSE,
  };
};

export const invitePeople = (data, cb, errorCb) => {
  return {
    type: commonTypes.INVITE_PEOPLE,
    payload: {
      request: {
        url: inviteApi.INVITE_PEOPLE,
        method: "post",
        data: data,
      },
      successMessage: "Invitation sent successfully",
      errorMessage: "Failed to send invitation",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
    },
  };
};

export const getInvitationDetails = (data, cb, errorCb) => {
  return {
    type: commonTypes.GET_INVITATION_DETAILS,
    payload: {
      request: {
        url: inviteApi.GET_INVITATION_DETAILS,
        method: "get",
        params: {
          id: data,
        },
      },

      enableMessage: false,
      cb: cb,
      errorCb: errorCb,
    },
  };
};

export const checkIfInvited = (data, cb, errorCb) => {
  return {
    type: commonTypes.CHECK_IF_INVITED,
    payload: {
      request: {
        url: inviteApi.CHECK_IF_INVITED,
        method: "get",
        params: {
          invitationId: data.id,
          email: data.email,
        },
      },

      enableMessage: false,
      cb: cb,
      errorCb: errorCb,
    },
  };
};

export const acceptInvitation = (data, cb, errorCb) => {
  return {
    type: commonTypes.ACCEPT_INVITATION,
    payload: {
      request: {
        url: inviteApi.ACCEPT_INVITATION,
        method: "post",
        data: data,
      },
      successMessage: "Success",
      errorMessage: "Failed",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
    },
  };
};

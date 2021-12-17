import organizationApi from "../api/organizationApi";
import { organizationTypes } from "../types";

export const createOrganization = (data, cb, errorCb) => {
  return {
    type: organizationTypes.CREATE_ORGANIZATION,
    payload: {
      request: {
        url: organizationApi.CREATE_ORGANIZATION,
        method: "post",
        data: data,
      },
      enableMessage: true,
      successMessage: 'Organization created successfully',
      errorMessage: 'Failed to create organization',

      cb: cb,
      errorCb: errorCb,
    },
  };
};


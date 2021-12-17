import { commonTypes } from "../types";
import courseApi from "../api/courseApi";
///get all or a single course
export const getAllCourses = (courseId, cb, errorCb) => {
  return {
    type: commonTypes.GET_COURSES,
    payload: {
      request: {
        url: courseApi.GET_COURSES,
        method: "get",
        params: {
          courseId,
        },
      },
      enableMessage: false,

      cb: cb,
      errorCb: errorCb,
    },
  };
};

export const getAssignments = (courseId, cb, errorCb) => {
  return {
    type: commonTypes.GET_ASSIGNMENTS,
    payload: {
      request: {
        url: courseApi.GET_ASSIGNMENTS,
        method: "get",
        params: {
          courseId,
        },
      },
      enableMessage: false,

      cb: cb,
      errorCb: errorCb,
    },
  };
};

// import organizationApi from "../api/organizationApi";
// import { organizationTypes } from "../types";

// export const createOrganization = (data, cb, errorCb) => {
//   return {
//     type: organizationTypes.CREATE_ORGANIZATION,
//     payload: {
//       request: {
//         url: organizationApi.CREATE_ORGANIZATION,
//         method: "post",
//         data: data,
//       },
//       enableMessage: true,
//       successMessage: 'Organization created successfully',
//       errorMessage: 'Failed to create organization',

//       cb: cb,
//       errorCb: errorCb,
//     },
//   };
// };

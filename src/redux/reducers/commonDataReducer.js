import { userTypes, authTypes, commonTypes } from "../types";

const initialstate = {
  courses: [],
  groups: [],
  assignments: [],
  teachers: [],
  students: [],

  messages: [],

  isCourseLoading: false,

  isGroupsLoading: false,
  isAssignmentLoading: false,
};

const sizeReducer = (state = initialstate, action) => {
  const getData = () => action.payload.data.data;
  switch (action.type) {
    //courses
    case commonTypes.GET_COURSES:
      return {
        ...state,
        isCourseLoading: true,
      };

    case commonTypes.GET_COURSES_SUCCESS:
      return {
        ...state,
        courses: getData()?.courses || [],
        groups: getData()?.groups || [],
        isCourseLoading: false,
      };

    case commonTypes.GET_COURSES_FAIL:
      return {
        ...state,
        isCourseLoading: false,
      };

    //assignments
    case commonTypes.GET_ASSIGNMENTS:
      return {
        ...state,
        isAssignmentLoading: true,
      };

    case commonTypes.GET_ASSIGNMENTS_SUCCESS:
      return {
        ...state,
        assignments: getData()?.assignments || [],
        teachers: getData()?.teachers || [],
        students: getData()?.students || [],

        isAssignmentLoading: false,
      };

    case commonTypes.GET_ASSIGNMENTS_FAIL:
      return {
        ...state,
        isAssignmentLoading: false,
      };

    case commonTypes.REMOVE_ASSIGNMENT_DATA:
      return {
        ...state,
        assignments: [],
        teachers: [],
        students: [],
      };

    case commonTypes.SET_A_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

    case commonTypes.SET_MESSAGES:
      return {
        ...state,
        // messages: [...state.messages, ...action.payload],
        messages: [...action.payload, ...state.messages],
      };

    case commonTypes.SET_OLDER_MESSAGES:
      return {
        ...state,
        messages: [...action.payload, ...state.messages],
      };

    case commonTypes.CLEAN_MESSAGES:
      return {
        ...state,
        messages: [],
      };

    default:
      return state;
  }
};

export default sizeReducer;

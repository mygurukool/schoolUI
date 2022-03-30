import {
  userTypes,
  authTypes,
  commonTypes,
  groupTypes,
  courseTypes,
  assignmentTypes,
  teacherTypes,
  studentTypes,
  eventTypes,
} from "../types";

const initialstate = {
  courses: [],
  groups: [],
  assignments: [],
  teachers: [],
  students: [],
  permissions: [],

  messages: [],

  events: [],

  isCourseLoading: false,

  isGroupsLoading: false,
  isAssignmentLoading: false,

  currentGroup: undefined,
  currentCourse: undefined,
  invitation: undefined,
  submission: undefined,
};

const getFilteredAssignments = (arr, data) => {
  const findIndex = arr.findIndex(
    (a) => a.id === data.assignmentId || a._id === data.assignmentId
  );

  const findFile = arr[findIndex].uploadExercises.findIndex(
    (a) => a.id === data.fileId
  );
  arr[findIndex].uploadExercises[findFile].files.push(data);
  return arr;
};

const getFiltereddeletedAssignments = (arr, data) => {
  const findIndex = arr.findIndex(
    (a) => a.id === data.assignmentId || a._id === data.assignmentId
  );

  const findFile = arr[findIndex].uploadExercises.findIndex(
    (a) => a.id === data.fileId
  );
  const newFiles = arr[findIndex].uploadExercises[findFile].files.filter(
    (f) => f.id !== data.id
  );

  arr[findIndex].uploadExercises[findFile].files = newFiles;
  return arr;
};

const sizeReducer = (state = initialstate, action) => {
  const getData = () => action.payload.data.data;
  switch (action.type) {
    case studentTypes.UPLOAD_EXCERCISE_FILE_SUCCESS:
      return {
        ...state,
        assignments: getFilteredAssignments(
          state.assignments,
          action.payload.data.data
        ),
      };

    case studentTypes.DELETE_EXCERCISE_FILE_SUCCESS:
      return {
        ...state,
        assignments: getFiltereddeletedAssignments(
          state.assignments,
          action.payload.data.data
        ),
      };

    case eventTypes.GET_EVENTS_SUCCESS:
      return {
        ...state,
        events: getData(),
      };

    //submission

    //courses
    case commonTypes.GET_SUBMISSION_SUCCESS:
      return {
        ...state,
        submission: getData(),
      };

    //courses
    case commonTypes.GET_COURSES:
      return {
        ...state,
        isCourseLoading: true,
      };

    case courseTypes.GET_COURSE_SUCCESS:
      return {
        ...state,
        courses: getData() || [],
        isCourseLoading: false,
      };

    case commonTypes.GET_COURSES_FAIL:
      return {
        ...state,
        isCourseLoading: false,
      };

    //assignments
    case assignmentTypes.GET_ASSIGMENT:
      return {
        ...state,
        isAssignmentLoading: true,
      };

    case assignmentTypes.GET_ASSIGMENT_SUCCESS:
      return {
        ...state,
        assignments: getData()?.assignments || [],

        isAssignmentLoading: false,
      };

    case assignmentTypes.GET_ASSIGMENT_FAIL:
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

    //group

    case groupTypes.GET_GROUP_SUCCESS:
      const firstGroup = getData()?.groups[0];
      return {
        ...state,
        groups: getData()?.groups || [],
        permissions: firstGroup?.permissions || [],

        currentGroup: firstGroup,
      };

    case commonTypes.SET_CURRENT_GROUP:
      return {
        ...state,
        currentGroup: action.payload,
        permissions: action.payload.permissions,
      };

    case commonTypes.REMOVE_CURRENT_GROUP:
      return {
        ...state,
        currentGroup: undefined,
      };

    //course

    case commonTypes.SET_CURRENT_COURSE:
      return {
        ...state,
        currentCourse: action.payload,
      };

    case commonTypes.REMOVE_CURRENT_COURSE:
      return {
        ...state,
        currentCourse: undefined,
      };

    //invitation

    case commonTypes.GET_INVITATION_DETAILS_SUCCESS:
      return {
        ...state,
        invitation: getData(),
      };

    //TEACHERS

    case teacherTypes.GET_TEACHERS_SUCCESS:
      return {
        ...state,
        teachers: getData(),
      };

    case studentTypes.GET_STUDENTS_SUCCESS:
      return {
        ...state,
        students: getData(),
      };

    case authTypes.LOGOUT_USER:
      return initialstate;
    default:
      return state;
  }
};

export default sizeReducer;

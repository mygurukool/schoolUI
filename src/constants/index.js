import moment from "moment";

export const DATEFORMAT = "DD/MM/YYYY";
export const DAYMONTHFORMAT = "DD/MM";

export const DATEMONTHFORMAT = "DD MMM";

export const TIMEAMPMFORMAT = "h:mm A";

export const TIME24FORMAT = "HH:mm";

// const url = "http://52.55.94.175"

// export const BASEURL = "http://52.55.94.175:4001/api";

export const BASEURL = process.env.REACT_APP_BASEURL;
export const SOCKETURL = process.env.REACT_APP_SOCKETURL;

export const BASEIMAGEURL = BASEURL;

export const TIMEFORMAT = "HH:mm:ss";

export const TIMEONLY = "HH:mm";

export const DATETIMEFORMAT = "DD/MM/YYYY HH:mm";

export const TIMEZONE = "Asia/Kolkata";

export const ROOTURL = "";

export const CURRENCY = "₹";

export const MONTHSARRAY = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const WEEKARRAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const DUEDATECOLORS = [
  {
    days: 7,
    color: "red",
  },

  {
    days: 14,
    color: "yellow",
  },

  {
    days: 20,
    color: "green",
  },

  {
    days: 30,
    color: "purple",
  },
];

export const DUEDATETIMEFORMAT = `DD/MM/YYYY HH:mm`;

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const dateRanges = {
  Today: [moment().toDate(), moment().toDate()],
  Yesterday: [
    moment().subtract(1, "days").toDate(),
    moment().subtract(1, "days").toDate(),
  ],
  "Last 7 Days": [moment().subtract(6, "days").toDate(), moment().toDate()],
  "Last 30 Days": [moment().subtract(29, "days").toDate(), moment().toDate()],
  "This Month": [
    moment().startOf("month").toDate(),
    moment().endOf("month").toDate(),
  ],
  "Last Month": [
    moment().subtract(1, "month").startOf("month").toDate(),
    moment().subtract(1, "month").endOf("month").toDate(),
  ],
};

export const ageGroups = [
  {
    id: 1,
    text: "Preteen",
  },
  {
    id: 2,
    text: "Teen",
  },
  {
    id: 3,
    text: "Adult",
  },
];

export const ROLES = {
  organizationOwner: "ORGANIZATION_OWNER",
  teacher: "TEACHER",
  student: "STUDENT",
};

export const SCOPES = {
  CAN_CREATE_TEACHER: "CAN-CREATE-TEACHER",
  CAN_EDIT_TEACHER: "CAN-EDIT-TEACHER",
  CAN_DELETE_TEACHER: "CAN-DELETE-TEACHER",
  CAN_VIEW_TEACHER: "CAN-VIEW-TEACHER",

  CAN_SUBMIT_ASSIGNMENT: "CAN-SUBMIT-ASSIGNMENT",

  CAN_INVITE_TEACHER: "CAN-INVITE-TEACHER",

  CAN_INVITE_STUDENT: "CAN-INVITE-STUDENT",

  CAN_CREATE_STUDENT: "CAN-CREATE-STUDENT",
  CAN_EDIT_STUDENT: "CAN-EDIT-STUDENT",
  CAN_DELETE_STUDENT: "CAN-DELETE-STUDENT",
  CAN_VIEW_STUDENT: "CAN-VIEW-STUDENT",

  CAN_CREATE_GROUP: "CAN-CREATE-GROUP",
  CAN_EDIT_GROUP: "CAN-EDIT-GROUP",
  CAN_DELETE_GROUP: "CAN-DELETE-GROUP",
  CAN_VIEW_GROUP: "CAN-VIEW-GROUP",

  CAN_CREATE_COURSE: "CAN-CREATE-COURSE",
  CAN_EDIT_COURSE: "CAN-EDIT-COURSE",
  CAN_DELETE_COURSE: "CAN-DELETE-COURSE",
  CAN_VIEW_COURSE: "CAN-VIEW-COURSE",

  CAN_CREATE_ASSIGNMENT: "CAN-CREATE-ASSIGNMENT",
  CAN_EDIT_ASSIGNMENT: "CAN-EDIT-ASSIGNMENT",
  CAN_DELETE_ASSIGNMENT: "CAN-DELETE-ASSIGNMENT",
  CAN_VIEW_ASSIGNMENT: "CAN-VIEW-ASSIGNMENT",

  CAN_CREATE_ASSIGNMENT_FILES: "CAN-CREATE-ASSIGNMENT_FILES",
  CAN_EDIT_ASSIGNMENT_FILES: "CAN-EDIT-ASSIGNMENT_FILES",
  CAN_DELETE_ASSIGNMENT_FILES: "CAN-DELETE-ASSIGNMENT_FILES",
  CAN_VIEW_ASSIGNMENT_FILES: "CAN-VIEW-ASSIGNMENT_FILES",

  CAN_CREATE_ASSIGNMENT_WORK: "CAN-CREATE-ASSIGNMENT_WORK",
  CAN_EDIT_ASSIGNMENT_WORK: "CAN-EDIT-ASSIGNMENT_WORK",
  CAN_DELETE_ASSIGNMENT_WORK: "CAN-DELETE-ASSIGNMENT_WORK",
  CAN_VIEW_ASSIGNMENT_WORK: "CAN-VIEW-ASSIGNMENT_WORK",

  CAN_CREATE_WHITEBOARD: "CAN-CREATE-WHITEBOARD",
  CAN_EDIT_WHITEBOARD: "CAN-EDIT-WHITEBOARD",
  CAN_DELETE_WHITEBOARD: "CAN-DELETE-WHITEBOARD",
  CAN_VIEW_WHITEBOARD: "CAN-VIEW-WHITEBOARD",

  CAN_CREATE_CONFERENCE: "CAN-CREATE-CONFERENCE",
  CAN_EDIT_CONFERENCE: "CAN-EDIT-CONFERENCE",
  CAN_DELETE_CONFERENCE: "CAN-DELETE-CONFERENCE",
  CAN_VIEW_CONFERENCE: "CAN-VIEW-CONFERENCE",

  CAN_CHECK_SUBMISSIONS: "CAN-CHECK-SUBMISSIONS",

  canCreate: "can-create",
  canEdit: "can-edit",
  canDelete: "can-delete",
  canView: "can-view",
};

const studentScopes = [
  SCOPES.CAN_VIEW_ASSIGNMENT,

  SCOPES.CAN_VIEW_GROUP,
  SCOPES.CAN_VIEW_COURSE,

  SCOPES.CAN_VIEW_TEACHER,
  SCOPES.CAN_VIEW_ASSIGNMENT_FILES,
  SCOPES.CAN_VIEW_ASSIGNMENT_WORK,
  SCOPES.CAN_VIEW_WHITEBOARD,
  SCOPES.CAN_VIEW_CONFERENCE,

  SCOPES.CAN_EDIT_WHITEBOARD,
  SCOPES.CAN_DELETE_WHITEBOARD,
];

const teacherScopes = [
  ...studentScopes,

  SCOPES.CAN_CREATE_TEACHER,
  SCOPES.CAN_EDIT_TEACHER,
  SCOPES.CAN_DELETE_TEACHER,
  SCOPES.CAN_VIEW_TEACHER,

  SCOPES.CAN_INVITE_TEACHER,

  SCOPES.CAN_INVITE_STUDENT,

  SCOPES.CAN_CREATE_STUDENT,
  SCOPES.CAN_EDIT_STUDENT,
  SCOPES.CAN_DELETE_STUDENT,
  SCOPES.CAN_VIEW_STUDENT,

  SCOPES.CAN_CREATE_GROUP,
  SCOPES.CAN_EDIT_GROUP,
  SCOPES.CAN_DELETE_GROUP,

  SCOPES.CAN_CREATE_COURSE,
  SCOPES.CAN_EDIT_COURSE,
  SCOPES.CAN_DELETE_COURSE,

  SCOPES.CAN_CREATE_ASSIGNMENT,
  SCOPES.CAN_EDIT_ASSIGNMENT,
  SCOPES.CAN_DELETE_ASSIGNMENT,

  SCOPES.CAN_CREATE_ASSIGNMENT_FILES,
  SCOPES.CAN_EDIT_ASSIGNMENT_FILES,
  SCOPES.CAN_DELETE_ASSIGNMENT_FILES,

  SCOPES.CAN_CREATE_CONFERENCE,
  SCOPES.CAN_EDIT_CONFERENCE,
  SCOPES.CAN_DELETE_CONFERENCE,
  SCOPES.CAN_VIEW_CONFERENCE,
  SCOPES.CAN_CHECK_SUBMISSIONS,
];

export const PERMISSIONS = {
  [ROLES.student]: [
    ...studentScopes,
    SCOPES.CAN_CREATE_ASSIGNMENT_WORK,
    SCOPES.CAN_EDIT_ASSIGNMENT_WORK,
    SCOPES.CAN_DELETE_ASSIGNMENT_WORK,
    SCOPES.CAN_VIEW_ASSIGNMENT_WORK,
    SCOPES.CAN_SUBMIT_ASSIGNMENT,
  ],
  [ROLES.teacher]: teacherScopes,

  [ROLES.organizationOwner]: [...teacherScopes],
};

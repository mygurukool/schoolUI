import moment from "moment";

export const DATEFORMAT = "DD/MM/YYYY";
export const DAYMONTHFORMAT = "DD/MM";

export const DATEMONTHFORMAT = "DD MMM";

export const TIMEAMPMFORMAT = "h:mm A";

export const TIME24FORMAT = "HH:mm";

// const url = "http://52.55.94.175"
const url = "http://192.168.0.111:4000";

// export const BASEURL = "http://52.55.94.175:4001/api";

export const BASEURL = url + "/api/";
export const SOCKETURL = "ws://192.168.0.111:4001";

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
export const ROLES = [
  { title: "Admin", value: "admin" },
  { title: "Employee", value: "employee" },
];

export const FRAMEDATA = [
  { title: "Logo", value: "logo" },
  { title: "Mobile", value: "mobile" },
  { title: "Email", value: "email" },
  { title: "Address", value: "address" },
  { title: "Website", value: "website" },
  { title: "Person Image", value: "personImage" },
];

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

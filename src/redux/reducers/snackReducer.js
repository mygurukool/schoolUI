const initialstate = {
  message: "",
  severity: "",
  open: false,
};
let success = "success";

const snackReducer = (state = initialstate, action) => {
  switch (action.type) {
    case "HIDE_SNACKBAR":
      return initialstate;
    case "SHOW_SNACKBAR":
      return {
        ...state,
        message: action.payload.data || "Success",
        severity: action.payload.severity,
        open: true,
      };

    default:
      return state;
  }
};

export default snackReducer;

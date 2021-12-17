import { combineReducers } from "redux";
import userReducer from "./userReducer";
import snackReducer from "./snackReducer";
import utilReducer from "./utilReducer";
import commonDataReducer from "./commonDataReducer";

export default combineReducers({
  user: userReducer,
  snack: snackReducer,
  util: utilReducer,
  common: commonDataReducer,
});

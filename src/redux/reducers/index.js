import { combineReducers } from "redux";
import snackReducer from "./snackReducer";
import utilReducer from "./utilReducer";

export default combineReducers({
  snack: snackReducer,
  util: utilReducer,
});

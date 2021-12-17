import { utilTypes } from "../types";
const initialstate = {
  spinner: false,
  language: "gu",
  messages: [],
  modalOpen: undefined,
};

const utilReducer = (state = initialstate, action) => {
  switch (action.type) {
    case utilTypes.TOGGLE_FULL_SCREEN:
      return {
        ...state,
        isFullScreen: !state.isFullScreen,
      };

    case utilTypes.TOGGLE_DRAWER:
      return {
        ...state,
        drawerOpen: !state.drawerOpen,
      };

    case utilTypes.TOGGLE_DRAWER:
      return {
        ...state,
        drawerOpen: !state.drawerOpen,
      };

    case utilTypes.SET_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      };

    case utilTypes.OPEN_MODAL:
      return {
        ...state,
        modalOpen: action.payload,
      };

    case utilTypes.CLOSE_MODAL:
      return {
        ...state,
        modalOpen: undefined,
      };

    case "SPINNER_START":
      return {
        ...state,
        spinner: true,
      };

    case "SPINNER_STOP":
      return {
        ...state,
        spinner: false,
      };

    default:
      return state;
  }
};

export default utilReducer;

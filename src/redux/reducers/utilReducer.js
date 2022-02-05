import { utilTypes } from "../types";
const initialstate = {
  spinner: false,
  language: "gu",
  modalOpen: undefined,
  modalData: undefined,
  toggleButton: false,
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

    case 'TOGGLE_BUTTON':
      return {
        ...state,
        toggleButton: !state.toggleButton,
      };

    case utilTypes.TOGGLE_DRAWER:
      return {
        ...state,
        drawerOpen: !state.drawerOpen,
      };

    case utilTypes.OPEN_MODAL:
      return {
        ...state,
        modalOpen: action.payload.value,
        modalData: action.payload.data,
      };

    case utilTypes.CLOSE_MODAL:
      return {
        ...state,
        modalOpen: undefined,
        modalData: undefined,
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

import { utilTypes } from "../types";
const initialstate = {
  spinner: false,
  modalOpen: undefined,
  modalData: undefined,
  pricingSelection: undefined,
  subjectSelection: undefined,
  notifications: [],
};

const utilReducer = (state = initialstate, action) => {
  switch (action.type) {

    case utilTypes.SUBJECT_SELECTION:
      return {
        ...state,
        subjectSelection: action.payload
      };

    case utilTypes.PRICING_SELECTION:
      return {
        ...state,
        pricingSelection: action.payload
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

    default:
      return state;
  }
};

export default utilReducer;

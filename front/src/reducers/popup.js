import produce from "../util/produce";

export const initialState = {
  addPopupLoading: false,
  addPopupDone: false,
  addPopupError: null,
  loadPopupLoading: false,
  loadPopupDone: false,
  loadPopupError: null,
  activePopupLoading: false,
  activePopupDone: false,
  activePopupError: null,
  deletePopupLoading: false,
  deletePopupDone: false,
  deletePopupError: null,
  popup: null,
};

export const ADD_POPUP_REQUEST = "ADD_POPUP_REQUEST";
export const ADD_POPUP_SUCCESS = "ADD_POPUP_SUCCESS";
export const ADD_POPUP_FAILURE = "ADD_POPUP_FAILURE";

export const LOAD_POPUP_REQUEST = "LOAD_POPUP_REQUEST";
export const LOAD_POPUP_SUCCESS = "LOAD_POPUP_SUCCESS";
export const LOAD_POPUP_FAILURE = "LOAD_POPUP_FAILURE";

export const ACTIVE_POPUP_REQUEST = "ACTIVE_POPUP_REQUEST";
export const ACTIVE_POPUP_SUCCESS = "ACTIVE_POPUP_SUCCESS";
export const ACTIVE_POPUP_FAILURE = "ACTIVE_POPUP_FAILURE";

export const DELETE_POPUP_REQUEST = "DELETE_POPUP_REQUEST";
export const DELETE_POPUP_SUCCESS = "DELETE_POPUP_SUCCESS";
export const DELETE_POPUP_FAILURE = "DELETE_POPUP_FAILURE";

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ADD_POPUP_REQUEST:
        draft.addPopupLoading = true;
        draft.addPopupError = null;
        draft.addPopupDone = false;
        break;
      case ADD_POPUP_SUCCESS:
        draft.addPopupLoading = false;
        draft.addPopupDone = true;
        break;
      case ADD_POPUP_FAILURE:
        draft.addPopupLoading = false;
        draft.addPopupError = action.error;
        break;
      case LOAD_POPUP_REQUEST:
        draft.loadPopupLoading = true;
        draft.loadPopupError = null;
        draft.loadPopupDone = false;
        break;
      case LOAD_POPUP_SUCCESS:
        draft.loadPopupLoading = false;
        draft.popup = action.data;
        draft.loadPopupDone = true;
        break;
      case LOAD_POPUP_FAILURE:
        draft.loadPopupLoading = false;
        draft.loadPopupError = action.error;
        break;
      case ACTIVE_POPUP_REQUEST:
        draft.activePopupLoading = true;
        draft.activePopupError = null;
        draft.activePopupDone = false;
        break;
      case ACTIVE_POPUP_SUCCESS:
        draft.activePopupLoading = false;
        draft.activePopupDone = true;
        break;
      case ACTIVE_POPUP_FAILURE:
        draft.activePopupLoading = false;
        draft.activePopupError = action.error;
        break;
      default:
        return state;
    }
  });
};

export default reducer;

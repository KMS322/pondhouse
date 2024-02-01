import produce from "../util/produce";

export const initialState = {
  uploadListLoading: false,
  uploadListDone: false,
  uploadListError: null,
  lists: null,
};

export const UPLOAD_LIST_REQUEST = "UPLOAD_LIST_REQUEST";
export const UPLOAD_LIST_SUCCESS = "UPLOAD_LIST_SUCCESS";
export const UPLOAD_LIST_FAILURE = "UPLOAD_LIST_FAILURE";

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case UPLOAD_LIST_REQUEST:
        draft.uploadListLoading = true;
        draft.uploadListError = null;
        draft.uploadListDone = false;
        break;
      case UPLOAD_LIST_SUCCESS:
        draft.uploadListLoading = false;
        draft.lists = action.data;
        draft.uploadListDone = true;
        break;
      case UPLOAD_LIST_FAILURE:
        draft.uploadListLoading = false;
        draft.uploadListError = action.error;
        break;
      default:
        return state;
    }
  });
};

export default reducer;

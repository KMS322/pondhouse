import produce from "../util/produce";

export const initialState = {
  loadListsLoading: false,
  loadListsDone: false,
  loadListsError: null,
  deleteListLoading: false,
  deleteListDone: false,
  deleteListError: null,
  lists: null,
};

export const LOAD_LISTS_REQUEST = "LOAD_LISTS_REQUEST";
export const LOAD_LISTS_SUCCESS = "LOAD_LISTS_SUCCESS";
export const LOAD_LISTS_FAILURE = "LOAD_LISTS_FAILURE";

export const DELETE_LIST_REQUEST = "DELETE_LIST_REQUEST";
export const DELETE_LIST_SUCCESS = "DELETE_LIST_SUCCESS";
export const DELETE_LIST_FAILURE = "DELETE_LIST_FAILURE";

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_LISTS_REQUEST:
        draft.loadListsLoading = true;
        draft.loadListsError = null;
        draft.loadListsDone = false;
        break;
      case LOAD_LISTS_SUCCESS:
        draft.loadListsLoading = false;
        draft.lists = action.data;
        draft.loadListsDone = true;
        break;
      case LOAD_LISTS_FAILURE:
        draft.loadListsLoading = false;
        draft.loadListsError = action.error;
        break;
      case DELETE_LIST_REQUEST:
        draft.deleteListsLoading = true;
        draft.deleteListsError = null;
        draft.deleteListsDone = false;
        break;
      case DELETE_LIST_SUCCESS:
        draft.deleteListsLoading = false;
        draft.lists = draft.lists.filter((item) => item.id !== action.data.id);
        draft.deleteListsDone = true;
        break;
      case DELETE_LIST_FAILURE:
        draft.deleteListsLoading = false;
        draft.deleteListsError = action.error;
        break;
      default:
        return state;
    }
  });
};

export default reducer;

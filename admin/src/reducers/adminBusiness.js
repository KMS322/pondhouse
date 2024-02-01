import produce from "../util/produce";

export const initialState = {
  loadApplicationLoading: false,
  loadApplicationDone: false,
  loadApplicationError: null,
  loadAllApplicationsLoading: false,
  loadAllApplicationsDone: false,
  loadAllApplicationsError: null,
  loadAppliedListsLoading: false,
  loadAppliedListsDone: false,
  loadAppliedListsError: null,
  loadRecruitmentLoading: false,
  loadRecruitmentDone: false,
  loadRecruitmentError: null,
  loadMatchingListsLoading: false,
  loadMatchingListsDone: false,
  loadMatchingListsError: null,
  deleteMatchingListLoading: false,
  deleteMatchingListDone: false,
  deleteMatchingListError: null,
  addMatchingListLoading: false,
  addMatchingListDone: false,
  addMatchingListError: null,
  application: null,
  allApplications: null,
  appliedLists: null,
  matchingLists: [],
  recruitment: null,
};

export const LOAD_APPLICATION_REQUEST = "LOAD_APPLICATION_REQUEST";
export const LOAD_APPLICATION_SUCCESS = "LOAD_APPLICATION_SUCCESS";
export const LOAD_APPLICATION_FAILURE = "LOAD_APPLICATION_FAILURE";

export const LOAD_ALLAPPLICATIONS_REQUEST = "LOAD_ALLAPPLICATIONS_REQUEST";
export const LOAD_ALLAPPLICATIONS_SUCCESS = "LOAD_ALLAPPLICATIONS_SUCCESS";
export const LOAD_ALLAPPLICATIONS_FAILURE = "LOAD_ALLAPPLICATIONS_FAILURE";

export const LOAD_APPLIEDLISTS_REQUEST = "LOAD_APPLIEDLISTS_REQUEST";
export const LOAD_APPLIEDLISTS_SUCCESS = "LOAD_APPLIEDLISTS_SUCCESS";
export const LOAD_APPLIEDLISTS_FAILURE = "LOAD_APPLIEDLISTS_FAILURE";

export const LOAD_MATCHINGLISTS_REQUEST = "LOAD_MATCHINGLISTS_REQUEST";
export const LOAD_MATCHINGLISTS_SUCCESS = "LOAD_MATCHINGLISTS_SUCCESS";
export const LOAD_MATCHINGLISTS_FAILURE = "LOAD_MATCHINGLISTS_FAILURE";

export const DELETE_MATCHINGLIST_REQUEST = "DELETE_MATCHINGLIST_REQUEST";
export const DELETE_MATCHINGLIST_SUCCESS = "DELETE_MATCHINGLIST_SUCCESS";
export const DELETE_MATCHINGLIST_FAILURE = "DELETE_MATCHINGLIST_FAILURE";

export const ADD_MATCHINGLIST_REQUEST = "ADD_MATCHINGLIST_REQUEST";
export const ADD_MATCHINGLIST_SUCCESS = "ADD_MATCHINGLIST_SUCCESS";
export const ADD_MATCHINGLIST_FAILURE = "ADD_MATCHINGLIST_FAILURE";

export const LOAD_RECRUITMENT_REQUEST = "LOAD_RECRUITMENT_REQUEST";
export const LOAD_RECRUITMENT_SUCCESS = "LOAD_RECRUITMENT_SUCCESS";
export const LOAD_RECRUITMENT_FAILURE = "LOAD_RECRUITMENT_FAILURE";

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_APPLICATION_REQUEST:
        draft.loadApplicationLoading = true;
        draft.loadApplicationError = null;
        draft.loadApplicationDone = false;
        break;
      case LOAD_APPLICATION_SUCCESS:
        draft.loadApplicationLoading = false;
        draft.application = action.data;
        draft.loadApplicationDone = true;
        break;
      case LOAD_APPLICATION_FAILURE:
        draft.loadApplicationLoading = false;
        draft.loadApplicationError = action.error;
        break;
      case LOAD_ALLAPPLICATIONS_REQUEST:
        draft.loadAllApplicationsLoading = true;
        draft.loadAllApplicationsError = null;
        draft.loadAllApplicationsDone = false;
        break;
      case LOAD_ALLAPPLICATIONS_SUCCESS:
        draft.loadAllApplicationsLoading = false;
        draft.allApplications = action.data;
        draft.loadAllApplicationsDone = true;
        break;
      case LOAD_ALLAPPLICATIONS_FAILURE:
        draft.loadAllApplicationsLoading = false;
        draft.loadAllApplicationsError = action.error;
        break;
      case LOAD_APPLIEDLISTS_REQUEST:
        draft.loadAppliedListsLoading = true;
        draft.loadAppliedListsError = null;
        draft.loadAppliedListsDone = false;
        break;
      case LOAD_APPLIEDLISTS_SUCCESS:
        draft.loadAppliedListsLoading = false;
        draft.appliedLists = action.data;
        draft.loadAppliedListsDone = true;
        break;
      case LOAD_APPLIEDLISTS_FAILURE:
        draft.loadAppliedListsLoading = false;
        draft.loadAppliedListsError = action.error;
        break;
      case LOAD_MATCHINGLISTS_REQUEST:
        draft.loadMatchingListsLoading = true;
        draft.loadMatchingListsError = null;
        draft.loadMatchingListsDone = false;
        break;
      case LOAD_MATCHINGLISTS_SUCCESS:
        draft.loadMatchingListsLoading = false;
        draft.matchingLists = draft.matchingLists.concat(action.data);
        draft.loadMatchingListsDone = true;
        break;
      case LOAD_MATCHINGLISTS_FAILURE:
        draft.loadMatchingListsLoading = false;
        draft.loadMatchingListsError = action.error;
        break;
      case DELETE_MATCHINGLIST_REQUEST:
        draft.deleteMatchingListLoading = true;
        draft.deleteMatchingListDone = false;
        draft.deleteMatchingListError = null;
        break;
      case DELETE_MATCHINGLIST_SUCCESS:
        draft.deleteMatchingListLoading = false;
        draft.deleteMatchingListDone = true;
        draft.matchingLists = draft.matchingLists.filter(
          (item) => item.id !== action.data.id
        );
        break;
      case DELETE_MATCHINGLIST_FAILURE:
        draft.deleteMatchingListLoading = false;
        draft.deleteMatchingListError = action.error;
        break;
      case ADD_MATCHINGLIST_REQUEST:
        draft.addMatchingListLoading = true;
        draft.addMatchingListDone = false;
        draft.addMatchingListError = null;
        break;
      case ADD_MATCHINGLIST_SUCCESS:
        draft.addMatchingListLoading = false;
        draft.addMatchingListDone = true;
        draft.matchingLists = draft.matchingLists.concat(action.data);
        break;
      case ADD_MATCHINGLIST_FAILURE:
        draft.addMatchingListLoading = false;
        draft.addMatchingListError = action.error;
        break;
      case LOAD_RECRUITMENT_REQUEST:
        draft.loadRecruitmentLoading = true;
        draft.loadRecruitmentError = null;
        draft.loadRecruitmentDone = false;
        break;
      case LOAD_RECRUITMENT_SUCCESS:
        draft.loadRecruitmentLoading = false;
        draft.recruitment = action.data;
        draft.loadRecruitmentDone = true;
        break;
      case LOAD_RECRUITMENT_FAILURE:
        draft.loadRecruitmentLoading = false;
        draft.loadRecruitmentError = action.error;
        break;
      default:
        return state;
    }
  });
};

export default reducer;

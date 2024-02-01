import produce from "../util/produce";

export const initialState = {
  loadResumeLoading: false,
  loadResumeDone: false,
  loadResumeError: null,
  loadAllResumesLoading: false,
  loadAllResumesDone: false,
  loadAllResumesError: null,
  loadCareerLoading: false,
  loadCareerDone: false,
  loadCareerError: null,
  resume: null,
  allResumes: null,
  career: null,
};

export const LOAD_RESUME_REQUEST = "LOAD_RESUME_REQUEST";
export const LOAD_RESUME_SUCCESS = "LOAD_RESUME_SUCCESS";
export const LOAD_RESUME_FAILURE = "LOAD_RESUME_FAILURE";

export const LOAD_ALLRESUMES_REQUEST = "LOAD_ALLRESUMES_REQUEST";
export const LOAD_ALLRESUMES_SUCCESS = "LOAD_ALLRESUMES_SUCCESS";
export const LOAD_ALLRESUMES_FAILURE = "LOAD_ALLRESUMES_FAILURE";

export const LOAD_CAREER_REQUEST = "LOAD_CAREER_REQUEST";
export const LOAD_CAREER_SUCCESS = "LOAD_CAREER_SUCCESS";
export const LOAD_CAREER_FAILURE = "LOAD_CAREER_FAILURE";

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_RESUME_REQUEST:
        draft.loadResumeLoading = true;
        draft.loadResumeError = null;
        draft.loadResumeDone = false;
        break;
      case LOAD_RESUME_SUCCESS:
        draft.loadResumeLoading = false;
        draft.resume = action.data;
        draft.loadResumeDone = true;
        break;
      case LOAD_RESUME_FAILURE:
        draft.loadResumeLoading = false;
        draft.loadResumeError = action.error;
        break;
      case LOAD_CAREER_REQUEST:
        draft.loadCareerLoading = true;
        draft.loadCareerError = null;
        draft.loadCareerDone = false;
        break;
      case LOAD_CAREER_SUCCESS:
        draft.loadCareerLoading = false;
        draft.career = action.data;
        draft.loadCareerDone = true;
        break;
      case LOAD_CAREER_FAILURE:
        draft.loadCareerLoading = false;
        draft.loadCareerError = action.error;
        break;
      case LOAD_ALLRESUMES_REQUEST:
        draft.loadAllResumesLoading = true;
        draft.loadAllResumesError = null;
        draft.loadAllResumesDone = false;
        break;
      case LOAD_ALLRESUMES_SUCCESS:
        draft.loadAllResumesLoading = false;
        draft.allResumes = action.data;
        draft.loadAllResumesDone = true;
        break;
      case LOAD_ALLRESUMES_FAILURE:
        draft.loadAllResumesLoading = false;
        draft.loadAllResumesError = action.error;
        break;

      default:
        return state;
    }
  });
};

export default reducer;

import produce from "../util/produce";

export const initialState = {
  loadKakaoLoading: false,
  loadKakaoDone: false,
  loadKakaoError: null,
  sendKakaoLoading: false,
  sendKakaoDone: false,
  sendKakaoError: null,
  kakao: null,
};

export const LOAD_KAKAO_REQUEST = "LOAD_KAKAO_REQUEST";
export const LOAD_KAKAO_SUCCESS = "LOAD_KAKAO_SUCCESS";
export const LOAD_KAKAO_FAILURE = "LOAD_KAKAO_FAUILURE";

export const SEND_KAKAO_REQUEST = "SEND_KAKAO_REQUEST";
export const SEND_KAKAO_SUCCESS = "SEND_KAKAO_SUCCESS";
export const SEND_KAKAO_FAILURE = "SEND_KAKAO_FAUILURE";

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_KAKAO_REQUEST:
        draft.loadKakaoLoading = true;
        draft.loadKakaoError = null;
        draft.loadKakaoDone = false;
        break;
      case LOAD_KAKAO_SUCCESS:
        draft.loadKakaoLoading = false;
        draft.kakao = action.data;
        draft.loadKakaoDone = true;
        break;
      case LOAD_KAKAO_FAILURE:
        draft.loadKakaoLoading = false;
        draft.loadKakaoError = action.error;
        break;
      case SEND_KAKAO_REQUEST:
        draft.sendKakaoLoading = true;
        draft.sendKakaoError = null;
        draft.sendKakaoDone = false;
        break;
      case SEND_KAKAO_SUCCESS:
        draft.sendKakaoLoading = false;
        draft.sendKakaoDone = true;
        break;
      case SEND_KAKAO_FAILURE:
        draft.sendKakaoLoading = false;
        draft.sendKakaoError = action.error;
        break;
      default:
        return state;
    }
  });
};

export default reducer;

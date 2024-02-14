import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {
  LOAD_KAKAO_REQUEST,
  LOAD_KAKAO_SUCCESS,
  LOAD_KAKAO_FAILURE,
  SEND_KAKAO_REQUEST,
  SEND_KAKAO_SUCCESS,
  SEND_KAKAO_FAILURE,
} from "../reducers/kakao";

function loadKakaoAPI() {
  return axios.post("/kakao/load");
}

function* loadKakao() {
  try {
    const result = yield call(loadKakaoAPI);
    yield put({
      type: LOAD_KAKAO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_KAKAO_FAILURE,
      error: err.response.data,
    });
  }
}

function sendKakaoAPI(data) {
  return axios.post("/kakao/message", data);
}

function* sendKakao(action) {
  try {
    const result = yield call(sendKakaoAPI, action.data);
    yield put({
      type: SEND_KAKAO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SEND_KAKAO_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadKakao() {
  yield takeLatest(LOAD_KAKAO_REQUEST, loadKakao);
}

function* watchSendKakao() {
  yield takeLatest(SEND_KAKAO_REQUEST, sendKakao);
}

export default function* kakaoSaga() {
  yield all([fork(watchLoadKakao), fork(watchSendKakao)]);
}

import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {
  ADD_POPUP_REQUEST,
  ADD_POPUP_SUCCESS,
  ADD_POPUP_FAILURE,
  LOAD_POPUP_REQUEST,
  LOAD_POPUP_SUCCESS,
  LOAD_POPUP_FAILURE,
  ACTIVE_POPUP_REQUEST,
  ACTIVE_POPUP_SUCCESS,
  ACTIVE_POPUP_FAILURE,
} from "../reducers/popup";

function addPopupAPI(data) {
  return axios.post("/popup/add", data);
}

function* addPopup(action) {
  try {
    const result = yield call(addPopupAPI, action.data);
    yield put({
      type: ADD_POPUP_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_POPUP_FAILURE,
      error: err.response.data,
    });
  }
}

function loadPopupAPI(data) {
  return axios.post("/popup/load", data);
}

function* loadPopup(action) {
  try {
    const result = yield call(loadPopupAPI, action.data);
    yield put({
      type: LOAD_POPUP_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POPUP_FAILURE,
      error: err.response.data,
    });
  }
}

function activePopupAPI(data) {
  return axios.post("/popup/active", data);
}

function* activePopup(action) {
  try {
    const result = yield call(activePopupAPI, action.data);
    yield put({
      type: ACTIVE_POPUP_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ACTIVE_POPUP_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchAddPopup() {
  yield takeLatest(ADD_POPUP_REQUEST, addPopup);
}

function* watchLoadPopup() {
  yield takeLatest(LOAD_POPUP_REQUEST, loadPopup);
}

function* watchActivePopup() {
  yield takeLatest(ACTIVE_POPUP_REQUEST, activePopup);
}

export default function* popupSaga() {
  yield all([
    fork(watchAddPopup),
    fork(watchLoadPopup),
    fork(watchActivePopup),
  ]);
}

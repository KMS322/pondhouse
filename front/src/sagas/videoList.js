import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {
  LOAD_LISTS_REQUEST,
  LOAD_LISTS_SUCCESS,
  LOAD_LISTS_FAILURE,
  DELETE_LIST_REQUEST,
  DELETE_LIST_SUCCESS,
  DELETE_LIST_FAILURE,
} from "../reducers/videoList";

function loadListsAPI() {
  return axios.post("/list/load");
}

function* loadLists() {
  try {
    const result = yield call(loadListsAPI);
    yield put({
      type: LOAD_LISTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_LISTS_FAILURE,
      error: err.response.data,
    });
  }
}

function deleteListAPI(data) {
  return axios.post("/list/delete", data);
}

function* deleteList(action) {
  try {
    const result = yield call(deleteListAPI, action.data);
    yield put({
      type: DELETE_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DELETE_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchloadLists() {
  yield takeLatest(LOAD_LISTS_REQUEST, loadLists);
}

function* watchdeletelist() {
  yield takeLatest(DELETE_LIST_REQUEST, deleteList);
}

export default function* videoListSaga() {
  yield all([fork(watchloadLists), fork(watchdeletelist)]);
}

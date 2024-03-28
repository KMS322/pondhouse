import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {
  LOAD_LISTS_REQUEST,
  LOAD_LISTS_SUCCESS,
  LOAD_LISTS_FAILURE,
  DELETE_LIST_REQUEST,
  DELETE_LIST_SUCCESS,
  DELETE_LIST_FAILURE,
  ADD_LISTS_REQUEST,
  ADD_LISTS_SUCCESS,
  ADD_LISTS_FAILURE,
  CHANGE_LISTS_REQUEST,
  CHANGE_LISTS_SUCCESS,
  CHANGE_LISTS_FAILURE,
  UPDATE_LISTS_REQUEST,
  UPDATE_LISTS_SUCCESS,
  UPDATE_LISTS_FAILURE,
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

function addListsAPI(data) {
  return axios.post("/list/add", data);
}

function* addLists(action) {
  try {
    const result = yield call(addListsAPI, action.data);
    yield put({
      type: ADD_LISTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_LISTS_FAILURE,
      error: err.response.data,
    });
  }
}

function changeListsAPI(data) {
  return axios.post("/list/change", data);
}

function* changeLists(action) {
  try {
    const result = yield call(changeListsAPI, action.data);
    yield put({
      type: CHANGE_LISTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CHANGE_LISTS_FAILURE,
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

function updateListsAPI() {
  return axios.post("/list/update");
}

function* updateLists() {
  try {
    const result = yield call(updateListsAPI);
    yield put({
      type: UPDATE_LISTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPDATE_LISTS_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchloadLists() {
  yield takeLatest(LOAD_LISTS_REQUEST, loadLists);
}

function* watchaddlists() {
  yield takeLatest(ADD_LISTS_REQUEST, addLists);
}

function* watchchangelists() {
  yield takeLatest(CHANGE_LISTS_REQUEST, changeLists);
}

function* watchdeletelist() {
  yield takeLatest(DELETE_LIST_REQUEST, deleteList);
}

function* watchUpdatelists() {
  yield takeLatest(UPDATE_LISTS_REQUEST, updateLists);
}

export default function* videoListSaga() {
  yield all([
    fork(watchloadLists),
    fork(watchdeletelist),
    fork(watchchangelists),
    fork(watchaddlists),
    fork(watchUpdatelists),
  ]);
}

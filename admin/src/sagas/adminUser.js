import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {
  LOAD_ALLUSER_REQUEST,
  LOAD_ALLUSER_SUCCESS,
  LOAD_ALLUSER_FAILURE,
  LOAD_INDIVIDUAL_REQUEST,
  LOAD_INDIVIDUAL_SUCCESS,
  LOAD_INDIVIDUAL_FAILURE,
  LOAD_BUSINESS_REQUEST,
  LOAD_BUSINESS_SUCCESS,
  LOAD_BUSINESS_FAILURE,
  LOAD_DUMMY_REQUEST,
  LOAD_DUMMY_SUCCESS,
  LOAD_DUMMY_FAILURE,
} from "../reducers/adminUser";

function loadAllUserAPI() {
  return axios.post("/admin/user/allUser");
}

function* loadAllUser() {
  try {
    const result = yield call(loadAllUserAPI);
    yield put({
      type: LOAD_ALLUSER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_ALLUSER_FAILURE,
      error: err.response.data,
    });
  }
}

function loadIndividualAPI() {
  return axios.post("/admin/user/individual");
}

function* loadIndividual() {
  try {
    const result = yield call(loadIndividualAPI);
    yield put({
      type: LOAD_INDIVIDUAL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_INDIVIDUAL_FAILURE,
      error: err.response.data,
    });
  }
}

function loadBusinessAPI() {
  return axios.post("/admin/user/business");
}

function* loadBusiness() {
  try {
    const result = yield call(loadBusinessAPI);
    yield put({
      type: LOAD_BUSINESS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_BUSINESS_FAILURE,
      error: err.response.data,
    });
  }
}

function loadDummyAPI() {
  return axios.post("/test/addDummy");
}

function* loadDummy() {
  try {
    yield call(loadDummyAPI);
    yield put({
      type: LOAD_DUMMY_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_DUMMY_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadUser() {
  yield takeLatest(LOAD_ALLUSER_REQUEST, loadAllUser);
}

function* watchLoadIndividual() {
  yield takeLatest(LOAD_INDIVIDUAL_REQUEST, loadIndividual);
}

function* watchLoadBusiness() {
  yield takeLatest(LOAD_BUSINESS_REQUEST, loadBusiness);
}

function* watchLoadDummy() {
  yield takeLatest(LOAD_DUMMY_REQUEST, loadDummy);
}

export default function* adminUserSaga() {
  yield all([
    fork(watchLoadUser),
    fork(watchLoadIndividual),
    fork(watchLoadBusiness),
    fork(watchLoadDummy),
  ]);
}

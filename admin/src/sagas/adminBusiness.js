import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {
  LOAD_APPLICATION_REQUEST,
  LOAD_APPLICATION_SUCCESS,
  LOAD_APPLICATION_FAILURE,
  LOAD_ALLAPPLICATIONS_REQUEST,
  LOAD_ALLAPPLICATIONS_SUCCESS,
  LOAD_ALLAPPLICATIONS_FAILURE,
  LOAD_APPLIEDLISTS_REQUEST,
  LOAD_APPLIEDLISTS_SUCCESS,
  LOAD_APPLIEDLISTS_FAILURE,
  LOAD_MATCHINGLISTS_REQUEST,
  LOAD_MATCHINGLISTS_SUCCESS,
  LOAD_MATCHINGLISTS_FAILURE,
  DELETE_MATCHINGLIST_REQUEST,
  DELETE_MATCHINGLIST_SUCCESS,
  DELETE_MATCHINGLIST_FAILURE,
  ADD_MATCHINGLIST_REQUEST,
  ADD_MATCHINGLIST_SUCCESS,
  ADD_MATCHINGLIST_FAILURE,
  LOAD_RECRUITMENT_REQUEST,
  LOAD_RECRUITMENT_SUCCESS,
  LOAD_RECRUITMENT_FAILURE,
} from "../reducers/adminBusiness";

function loadApplicationAPI(data) {
  return axios.post("/admin/business/application", data);
}

function* loadApplication(action) {
  try {
    const result = yield call(loadApplicationAPI, action.data);
    yield put({
      type: LOAD_APPLICATION_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_APPLICATION_FAILURE,
      error: err.response.data,
    });
  }
}

function loadAllApplicationsAPI() {
  return axios.post("/admin/business/allApplications");
}

function* loadAllApplications() {
  try {
    const result = yield call(loadAllApplicationsAPI);
    yield put({
      type: LOAD_ALLAPPLICATIONS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_ALLAPPLICATIONS_FAILURE,
      error: err.response.data,
    });
  }
}

function loadAppliedListsAPI() {
  return axios.post("/admin/business/appliedLists");
}

function* loadAppliedLists() {
  try {
    const result = yield call(loadAppliedListsAPI);
    yield put({
      type: LOAD_APPLIEDLISTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_APPLIEDLISTS_FAILURE,
      error: err.response.data,
    });
  }
}

function loadMatchingListsAPI(data) {
  return axios.post("/admin/business/matchingLists", data);
}

function* loadMatchingLists(action) {
  try {
    const result = yield call(loadMatchingListsAPI, action.data);
    yield put({
      type: LOAD_MATCHINGLISTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_MATCHINGLISTS_FAILURE,
      error: err.response.data,
    });
  }
}

function deleteMatchingListAPI(data) {
  return axios.delete("/admin/business/deleteList", {
    data: { id: data.id, newCnt: data.newCnt },
  });
}

function* deleteMatchingList(action) {
  try {
    const result = yield call(deleteMatchingListAPI, action.data);
    yield put({
      type: DELETE_MATCHINGLIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DELETE_MATCHINGLIST_FAILURE,
      data: err.response.data,
    });
  }
}

function addMatchingListAPI(data) {
  return axios.post("/admin/business/addList", data);
}

function* addMatchingList(action) {
  try {
    const result = yield call(addMatchingListAPI, action.data);
    yield put({
      type: ADD_MATCHINGLIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_MATCHINGLIST_FAILURE,
      data: err.response.data,
    });
  }
}

function loadRecruitmentAPI(data) {
  return axios.post("/admin/business/recruitment", data);
}

function* loadRecruitment(action) {
  try {
    const result = yield call(loadRecruitmentAPI, action.data);
    yield put({
      type: LOAD_RECRUITMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_RECRUITMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadApplication() {
  yield takeLatest(LOAD_APPLICATION_REQUEST, loadApplication);
}

function* watchLoadRecruitment() {
  yield takeLatest(LOAD_RECRUITMENT_REQUEST, loadRecruitment);
}

function* watchLoadAllApplications() {
  yield takeLatest(LOAD_ALLAPPLICATIONS_REQUEST, loadAllApplications);
}

function* watchLoadMatchingLists() {
  yield takeLatest(LOAD_MATCHINGLISTS_REQUEST, loadMatchingLists);
}

function* watchDeleteMatchingList() {
  yield takeLatest(DELETE_MATCHINGLIST_REQUEST, deleteMatchingList);
}

function* watchAddMatchingList() {
  yield takeLatest(ADD_MATCHINGLIST_REQUEST, addMatchingList);
}

function* watchAppliedLists() {
  yield takeLatest(LOAD_APPLIEDLISTS_REQUEST, loadAppliedLists);
}

export default function* adminBusinessSaga() {
  yield all([
    fork(watchLoadApplication),
    fork(watchLoadRecruitment),
    fork(watchLoadAllApplications),
    fork(watchAppliedLists),
    fork(watchLoadMatchingLists),
    fork(watchDeleteMatchingList),
    fork(watchAddMatchingList),
  ]);
}

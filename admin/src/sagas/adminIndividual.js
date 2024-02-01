import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {
  LOAD_RESUME_REQUEST,
  LOAD_RESUME_SUCCESS,
  LOAD_RESUME_FAILURE,
  LOAD_ALLRESUMES_REQUEST,
  LOAD_ALLRESUMES_SUCCESS,
  LOAD_ALLRESUMES_FAILURE,
  LOAD_CAREER_REQUEST,
  LOAD_CAREER_SUCCESS,
  LOAD_CAREER_FAILURE,
} from "../reducers/adminIndividual";

function loadResumeAPI(data) {
  return axios.post("/admin/individual/resume", data);
}

function* loadResume(action) {
  try {
    const result = yield call(loadResumeAPI, action.data);
    yield put({
      type: LOAD_RESUME_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_RESUME_FAILURE,
      error: err.response.data,
    });
  }
}

function loadAllResumesAPI() {
  return axios.post("/admin/individual/allResumes");
}

function* loadAllResumes() {
  try {
    const result = yield call(loadAllResumesAPI);
    yield put({
      type: LOAD_ALLRESUMES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_ALLRESUMES_FAILURE,
      error: err.response.data,
    });
  }
}

function loadCareerAPI(data) {
  return axios.post("/admin/individual/career", data);
}

function* loadCareer(action) {
  try {
    const result = yield call(loadCareerAPI, action.data);
    yield put({
      type: LOAD_CAREER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_CAREER_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadResume() {
  yield takeLatest(LOAD_RESUME_REQUEST, loadResume);
}

function* watchLoadCareer() {
  yield takeLatest(LOAD_CAREER_REQUEST, loadCareer);
}

function* watchLoadAllResumes() {
  yield takeLatest(LOAD_ALLRESUMES_REQUEST, loadAllResumes);
}
export default function* adminIndividualSaga() {
  yield all([
    fork(watchLoadResume),
    fork(watchLoadCareer),
    fork(watchLoadAllResumes),
  ]);
}

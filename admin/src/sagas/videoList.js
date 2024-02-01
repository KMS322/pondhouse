import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {
  UPLOAD_LIST_REQUEST,
  UPLOAD_LIST_SUCCESS,
  UPLOAD_LIST_FAILURE,
} from "../reducers/videoList";

function uploadListAPI() {
  return axios.post("/list/upload");
}

function* uploadList() {
  try {
    const result = yield call(uploadListAPI);
    yield put({
      type: UPLOAD_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPLOAD_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchUploadList() {
  yield takeLatest(UPLOAD_LIST_REQUEST, uploadList);
}

export default function* videoListSaga() {
  yield all([fork(watchUploadList)]);
}

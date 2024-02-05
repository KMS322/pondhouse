import { all, fork } from "redux-saga/effects";
import axios from "axios";
import videoListSaga from "./videoList";
import contactSaga from "./contact";
import { API_URL } from "../constants";

axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([fork(videoListSaga), fork(contactSaga)]);
}

import { all, fork } from "redux-saga/effects";
import axios from "axios";
import adminUserSaga from "./adminUser";
import adminIndividualSaga from "./adminIndividual";
import adminBusinessSaga from "./adminBusiness";
import { API_URL } from "../constants";

axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(adminUserSaga),
    fork(adminIndividualSaga),
    fork(adminBusinessSaga),
  ]);
}

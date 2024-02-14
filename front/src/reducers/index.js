import { combineReducers } from "redux";
import user from "./user";
import videoList from "./videoList";
import contact from "./contact";
import kakao from "./kakao";

const rootReducer = combineReducers({
  user,
  videoList,
  contact,
  kakao,
});

export default rootReducer;

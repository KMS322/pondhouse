import { combineReducers } from "redux";
import user from "./user";
import videoList from "./videoList";
import contact from "./contact";

const rootReducer = combineReducers({
  user,
  videoList,
  contact,
});

export default rootReducer;

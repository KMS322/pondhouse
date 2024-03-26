import { combineReducers } from "redux";
import user from "./user";
import videoList from "./videoList";
import contact from "./contact";
import popup from "./popup";

const rootReducer = combineReducers({
  user,
  videoList,
  contact,
  popup,
});

export default rootReducer;

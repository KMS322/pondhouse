import { combineReducers } from "redux";
import videoList from "./videoList";
import contact from "./contact";

const rootReducer = combineReducers({
  videoList,
  contact,
});

export default rootReducer;

import { combineReducers } from "redux";
import adminUser from "./adminUser";
import adminIndividual from "./adminIndividual";
import adminBusiness from "./adminBusiness";

const rootReducer = combineReducers({
  adminUser,
  adminIndividual,
  adminBusiness,
});

export default rootReducer;

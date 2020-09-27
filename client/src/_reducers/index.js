import { combineReducers } from "redux";
import user from "./user_reducer";
import view from "./view_reducer";

const rootReducer = combineReducers({
  user,
  view,
});

export default rootReducer;

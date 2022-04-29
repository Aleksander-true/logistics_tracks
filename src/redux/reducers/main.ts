import { combineReducers } from "redux";
import cargo from "./cargo";
import route from "./route";

const reducer = combineReducers({
  route,
  cargo,
});

export default reducer;

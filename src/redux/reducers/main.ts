import { combineReducers } from "redux";
import cargo from "./cargo";
import cords from "./cords";
import route from "./route";

const reducer = combineReducers({
  route,
  cargo,
  cords,
});

export default reducer;

import { combineReducers } from "redux";
import cargo from "./cargo";
import cities from "./cities";
import cords from "./cords";
import route from "./route";

const reducer = combineReducers({
  route,
  cargo,
  cords,
  cities,
});

export default reducer;

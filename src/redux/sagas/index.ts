import { all } from "redux-saga/effects";
import { watchCargoSaga } from "./cargo-saga";
import { watchSetRoute } from "./route-saga";

export default function* rootSaga() {
  yield all([watchCargoSaga(), watchSetRoute()]);
}

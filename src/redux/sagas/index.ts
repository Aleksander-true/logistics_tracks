import { takeEvery, put, call, fork, all } from "redux-saga/effects";
import { ACTIONS } from "../constants";
import { getCargoData } from "../../api/index";
import { setCargoData } from "../actions/main";

export function* handleCargoData() {
  const data: CargoData[] = yield call(getCargoData);
  console.log("saga data", data);
  yield put(setCargoData(data));
}

export function* watchCargoSaga() {
  yield takeEvery(ACTIONS.GET_CARGO_DATA, handleCargoData);
}

export default function* rootSaga() {
  yield watchCargoSaga();
}

import { takeEvery, put, call } from "redux-saga/effects";
import { ACTIONS } from "../constants";
import { getCargoData } from "../../api/index";
import { setCargoData } from "../actions/main";

function* handleCargoData() {
  const data: CargoData[] = yield call(getCargoData);
  yield put(setCargoData(data));
}

export function* watchCargoSaga() {
  yield takeEvery(ACTIONS.GET_CARGO_DATA, handleCargoData);
}

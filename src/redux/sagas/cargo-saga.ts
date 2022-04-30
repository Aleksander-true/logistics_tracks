import { takeEvery, put, call } from "redux-saga/effects";
import { ACTIONS } from "../constants";
import { getCargoData, getCityData } from "../../api/index";
import { setCargoData, setCitiesData } from "../actions/main";

function* handleCargoData() {
  const cargos: CargoData[] = yield call(getCargoData);
  const cityes: string[] = yield call(getCityData);
  yield put(setCargoData(cargos));
  yield put(setCitiesData(cityes));
}

export function* watchCargoSaga() {
  yield takeEvery(ACTIONS.GET_CARGO_DATA, handleCargoData);
}

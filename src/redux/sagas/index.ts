import { takeEvery, put, call, all } from "redux-saga/effects";
import { ACTIONS } from "../constants";
import { getCargoData, getCoordinates, getRoute } from "../../api/index";
import { setCargoData, setCurrentCords } from "../actions/main";
import { swapLatWithLng } from "./utils";

export function* handleCargoData() {
  const data: CargoData[] = yield call(getCargoData);
  console.log("saga data", data);
  yield put(setCargoData(data));
}

export function* watchCargoSaga() {
  yield takeEvery(ACTIONS.GET_CARGO_DATA, handleCargoData);
}

/*** */

export function* handleSetRoute({ data }: { data: CargoData; type: string }) {
  const arrivalRes: GeocodingRes = yield call(() =>
    getCoordinates(data.arrival)
  );

  const arrival = arrivalRes.hits.find(
    ({ countrycode, osm_value }) =>
      countrycode === "RU" && (osm_value === "city" || osm_value === "town")
  )?.point;

  console.log("arrivalRes", arrivalRes, "arrival", arrival);

  const departureRes: GeocodingRes = yield call(() =>
    getCoordinates(data.departure)
  );
  const departure = departureRes.hits.find(
    ({ countrycode, osm_value }) =>
      countrycode === "RU" && (osm_value === "city" || osm_value === "town")
  )?.point;

  const routeCords: RouteAPIRes = yield call(() =>
    getRoute({ arrival, departure })
  );
  const path = swapLatWithLng(routeCords.paths[0].points.coordinates);

  if (arrival && departure && path) {
    yield put(setCurrentCords({ arrival, departure, path }));
  }
}

export function* watchSetRoute() {
  yield takeEvery(ACTIONS.SET_CURRENT_ROUTE, handleSetRoute);
}

export default function* rootSaga() {
  yield all([watchCargoSaga(), watchSetRoute()]);
}

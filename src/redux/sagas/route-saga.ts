import { takeEvery, put, call } from "redux-saga/effects";
import { ACTIONS } from "../constants";
import { getCoordinates, getRoute } from "../../api/index";
import { setCurrentCords } from "../actions/main";
import { swapLatWithLng } from "./utils";

export function* watchSetRoute() {
  yield takeEvery(ACTIONS.SET_CURRENT_ROUTE, handleSetRoute);
}

export function* handleSetRoute({ data }: { data: CargoData; type: string }) {
  const arrivalRes: GeocodingRes = yield call(() =>
    getCoordinates(data.arrival)
  );

  const departureRes: GeocodingRes = yield call(() =>
    getCoordinates(data.departure)
  );

  if (arrivalRes && departureRes) {
    const arrival = arrivalRes.hits.find(
      ({ countrycode, osm_value }) =>
        countrycode === "RU" && (osm_value === "city" || osm_value === "town")
    )?.point;

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
}

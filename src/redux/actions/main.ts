import { ACTIONS } from "../constants";

export const setCurrentRoute = (data: CargoData) => ({
  type: ACTIONS.SET_CURRENT_ROUTE,
  data,
});

export const getCargoData = () => ({
  type: ACTIONS.GET_CARGO_DATA,
});

export const setCargoData = (data: CargoData[]) => ({
  type: ACTIONS.SET_CARGO_DATA,
  data,
});

export const patchCargoData = (data: CargoData[]) => ({
  type: ACTIONS.PATCH_CARGO_DATA,
  data,
});

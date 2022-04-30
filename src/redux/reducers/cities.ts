import { ACTIONS } from "../constants";

const initialState = [] as string[];

const cities = (state = initialState, { type, data }: CitiesAction) => {
  switch (type) {
    case ACTIONS.SET_CITIES_DATA:
      return [...data];
    default:
      return state;
  }
};

export default cities;

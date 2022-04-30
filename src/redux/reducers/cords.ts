import { ACTIONS } from "../constants";

const initialState = {
  departure: { lat: 0, lng: 0 },
  arrival: { lat: 0, lng: 0 },
};

const cords = (
  state = initialState,
  { type, data }: CordAction
): RouteCords => {
  switch (type) {
    case ACTIONS.SET_CURRENT_CORDS:
      return { ...data };
    default:
      return state;
  }
};

export default cords;

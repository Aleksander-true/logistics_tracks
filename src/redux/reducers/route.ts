import { ACTIONS } from "../constants";

const initialState = {
  key: "",
  customer: "",
  cargo: "",
  departure: "",
  arrival: "",
};

const route = (state = initialState, { type, data }: RouteAction) => {
  switch (type) {
    case ACTIONS.SET_CURRENT_ROUTE:
      return { ...data };
    default:
      return state;
  }
};

export default route;

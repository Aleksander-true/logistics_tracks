import { ACTIONS } from "../constants";

const initialState = [] as CargoData[];

const cargo = (state = initialState, { type, data }: CargoAction) => {
  switch (type) {
    case ACTIONS.SET_CARGO_DATA:
      return [...data];

    case ACTIONS.PATCH_CARGO_DATA: {
      return state.map((item) => (item.key === data[0].key ? data[0] : item));
    }
    default:
      return state;
  }
};

export default cargo;

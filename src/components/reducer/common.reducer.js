import { SET_DATA } from "../action";

const initialState = {
  countryArray: [],
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DATA:
      return { ...state, countryArray: action.payload.countryArray };
    default:
      return state;
  }
}

import { combineReducers } from "redux";

import commonReducer from "./common.reducer";

const rootReducer = combineReducers({
  common: commonReducer,
});

// export default rootReducer

export default (state, action) => rootReducer(state, action);

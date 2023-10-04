import { createStore, applyMiddleware } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "../reducer";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const pReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(pReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);

import { AsyncStorage } from "react-native";

import { persistStore, persistReducer } from "redux-persist";

import reducer from "./reducer";
import { createStore } from "redux";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  // whitelist: ["persistingReducer"],
};

const persistingReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistingReducer);

const persistor = persistStore(store);

export { store, persistor };

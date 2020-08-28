import React, { useState } from "react";
import { YellowBox } from "react-native";
import ClearContext from "./context/Clear";
import { Provider } from "react-redux";
import ClearForReddit from "./ClearForReddit";
import { store, persistor } from "./redux/store";
import { decode, encode } from "base-64";
import { PersistGate } from "redux-persist/integration/react";

declare var global: any;

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

const s = require("./assets/styles/mainStyles.js");

YellowBox.ignoreWarnings(["Setting a timer"]);

export default function App() {
  const [clear, setClear] = useState(null);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ClearContext.Provider value={{ clear: clear, updateClear: setClear }}>
          <ClearForReddit />
        </ClearContext.Provider>
      </PersistGate>
    </Provider>
  );
}

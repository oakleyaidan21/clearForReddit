import React, { useState, useEffect } from "react";
import { YellowBox } from "react-native";
import ClearContext from "./context/Clear";
import { Provider } from "react-redux";
import ClearForReddit from "./ClearForReddit";
import { store, persistor } from "./redux/store";
import { decode, encode } from "base-64";
import { PersistGate } from "redux-persist/integration/react";
import * as SplashScreen from "expo-splash-screen";

declare var global: any;

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}
YellowBox.ignoreWarnings(["Setting a timer"]);

export default function App() {
  useEffect(() => {
    const splashHideTimer = setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 1000);
  }, []);

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

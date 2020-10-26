import React, {useState, useEffect} from 'react';
import {LogBox} from 'react-native';
import ClearContext from './context/Clear';
import {Provider} from 'react-redux';
import ClearForReddit from './ClearForReddit';
import {store, persistor} from './redux/store';
import {decode, encode} from 'base-64';
import {PersistGate} from 'redux-persist/integration/react';
import SplashScreen from 'react-native-splash-screen';

declare var global: any;

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}
LogBox.ignoreLogs(['Setting a timer']);

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const [clear, setClear] = useState(null);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ClearContext.Provider value={{clear: clear, updateClear: setClear}}>
          <ClearForReddit />
        </ClearContext.Provider>
      </PersistGate>
    </Provider>
  );
}

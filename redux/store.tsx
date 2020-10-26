import AsyncStorage from '@react-native-community/async-storage';

import {persistStore, persistReducer} from 'redux-persist';

import reducer from './reducer';
import {createStore} from 'redux';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistingReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistingReducer);

const persistor = persistStore(store);

export {store, persistor};

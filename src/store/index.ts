import {
  createStore,
  Store
} from 'redux';
import {
  persistStore,
  persistReducer
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { AlarmState } from '../models';
import alarmReducer from '../reducers/alarmReducer';

const persistConfig={
  key: 'root',
  storage
};

const persistedReducer=persistReducer(persistConfig, alarmReducer);

export default () => {
  let store: Store<AlarmState>=createStore(persistedReducer);
  let persistor=persistStore(store);

  return {
    store,
    persistor
  };
};

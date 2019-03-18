import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from '../../store';
import Alarm from '../Alarm';

const {
  store,
  persistor
}=configureStore();

const App=() => (
  <Provider store={store}>
    <PersistGate
      loading={null}
      persistor={persistor}>
      <Alarm />
    </PersistGate>
  </Provider>
);

export default App;

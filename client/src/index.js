import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// 1) In order to wire up a redux/react app, we need react-redux (Provider)
import { Provider } from 'react-redux';
// 2) Create redux store so that redux exists and the provider has a store
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';

// 3)  reducers to populate the store
// 3A) Start with rooteReducers(store manager)
// 4) make individual reducers to hand to the rootreducer (3)
import rootReducer from './reducers/rootReducer';

// Redux Persist SDetup
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { PersistGate } from 'redux-persist/integration/react';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
};

// 5) create the store (2) by passing it the root reducer, which is made up of the Reducers

const persistedReducer = persistReducer(persistConfig, rootReducer);
const theStore = applyMiddleware(reduxPromise)(createStore)(persistedReducer);
const persistor = persistStore(theStore);

// Provider is the glue between react and redux. give it the store

ReactDOM.render(
  <Provider store={theStore}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

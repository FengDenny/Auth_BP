import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Spinner from './utility/Spinner/Spinner';
// 1) In order to wire up a redux/react app, we need react-redux (Provider)

// Redux setup
import { Provider } from 'react-redux';
// 2) Create redux store so that redux exists and the provider has a store
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
// 3)  reducers to populate the store
// 3A) Start with rooteReducers(store manager)
// 4) make individual reducers to hand to the rootreducer (3)
import rootReducer from './reducers/rootReducer';
// Redux persist set up to keep redux from resetting state
//in our case, oue navbar logout button
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore, persistReducer } from 'redux-persist';
// defaults to localStorage for web
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,

  // to not include in the refresh or in the hydration
  // blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
// 5) create the store (2) by passing it the root reducer, which is made up of the Reducers
const theStore = applyMiddleware(reduxPromise)(createStore)(persistedReducer);
const persistor = persistStore(theStore);

// Provider is the glue between react and redux. give it the store

ReactDOM.render(
  <Provider store={theStore}>
    <PersistGate loading={<Spinner />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

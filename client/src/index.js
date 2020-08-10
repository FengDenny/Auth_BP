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

// 5) create the store (2) by passing it the root reducer, which is made up of the Reducers
const theStore = applyMiddleware(reduxPromise)(createStore)(rootReducer);

// Provider is the glue between react and redux. give it the store

ReactDOM.render(
  <Provider store={theStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);

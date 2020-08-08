//  to create a rootreducer
// 1) Get a method from redux, called combineReducer
import { combineReducers } from 'redux';
// 2) get each individual reducer
import authReducer from './authReducer';
// 3) call combineReducer and hand it an object
// each key in combineReducer will be a piece of state in the redux store
// each value, will be the value of that piece of state in the redux store
const rootreducer = combineReducers({ auth: authReducer });

export default rootreducer;

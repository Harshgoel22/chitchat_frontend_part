import rootReducer from './reducer';
import {compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const redux = require('redux');
const createStore = redux.legacy_createStore;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));

export default store;

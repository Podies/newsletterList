import { createStore, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';

// import root reducer
import rootReducer from './reducers/index';

// default state of the store

const defaultState = window.__INITIAL_STATE__;

const store = createStore(rootReducer, defaultState, applyMiddleware(thunk));
export const history = syncHistoryWithStore(browserHistory, store);

export default store;
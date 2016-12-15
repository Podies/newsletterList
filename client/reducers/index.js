import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import categories from './categories';
import newsletters from './newsletters'

const rootReducer = combineReducers({categories, newsletters, routing: routerReducer});

export default rootReducer;
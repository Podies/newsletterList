import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import categories from './categories';
import newsletters from './newsletters';
import show404page from './show404page';

const rootReducer = combineReducers({categories, newsletters, show404page, routing: routerReducer});

export default rootReducer;
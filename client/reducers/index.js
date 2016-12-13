import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import categories from './categories';
import subCategories from './subCategories';

const rootReducer = combineReducers({categories, subCategories, routing: routerReducer});

export default rootReducer;
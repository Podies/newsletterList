import React from 'react';
import Landing from './components/Landing';
import NotFoundPage from './components/NotFoundPage';
import App from './components/App';
import { Route, IndexRoute } from 'react-router';
import CategoryPage from './components/CategoryPage';

export default (
  <Route component={App} path="/" >
    <IndexRoute component={Landing} />
    <Route component={CategoryPage} path=":category" />
    <Route component={CategoryPage} path=":category/:subcategory" />
    <Route component={NotFoundPage} path="*" status={404} />
  </Route>
);

import React from 'react';
import Landing from './components/Landing';
import NotFoundPage from './components/NotFoundPage';
import App from './components/App';
import { Route, IndexRoute } from 'react-router';
import CategoryPage from './components/CategoryPage';
import SubscribePage from './components/SubscribePage';
import SearchPage from './components/SearchPage';

export default (
  <Route component={App} path="/" >
    <IndexRoute component={Landing} />
    <Route component={SubscribePage} path="/subscribe" />
    <Route component={SearchPage} path="/search" />
    <Route component={CategoryPage} path=":category" />
    <Route component={CategoryPage} path=":category/:subcategory" />
    <Route component={NotFoundPage} path="*" status={404} />
  </Route>
);

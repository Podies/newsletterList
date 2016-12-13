import React from 'react';
import Landing from './components/Landing';
import NotFoundPage from './components/NotFoundPage';
import App from './components/App';
import { Route, IndexRoute } from 'react-router';
import CategoryPage from './components/CategoryPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Landing} />
    <Route path="category" component={CategoryPage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);

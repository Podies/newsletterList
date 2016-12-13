import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

//Import components
import { Router } from 'react-router';
import routes from './routes';
import store, { history } from './store';

render(
  <Provider store={store} >
    <Router children={routes} history={history} />
  </Provider>
  , document.getElementById('app')
  );
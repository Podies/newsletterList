import React from 'react';
import { render } from 'react-dom';

//Import components

import Landing from './components/Landing';

const App = () => <Landing />;

render(<App />, document.getElementById('app'));
import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/App.js';

import { Router, Route, /*IndexRoute,*/ hashHistory } from 'react-router';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/(:category)" component={App} />
  </Router>,
  document.getElementById('root')
);
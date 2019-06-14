import * as React from 'react';
import { Switch, Route } from 'react-router';
const routes = require('./constants/routes.json');
import App from './containers/App';
import HomePage from './containers/Home';

export default () => (
  <App>
    <Switch>
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);

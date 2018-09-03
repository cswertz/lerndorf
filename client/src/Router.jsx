import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import Register from './Register';

const Router = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/register" component={Register} />
  </Switch>
);

export default Router;

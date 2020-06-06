import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFound from '../../NotFound';
import Home from '../../Home';
import Movies from '../../Movies';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/movies" component={Movies} />

      {/* no match routes */}
      <Route exact component={NotFound} />
    </Switch>
  );
}

export default Routes;

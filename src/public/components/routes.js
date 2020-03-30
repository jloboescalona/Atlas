import React from 'react';
import { Route, Switch } from 'react-router-dom';
import constants from '../constants';
import { AuthLayout } from '../components/HOC';
import Error404 from '../components/containers/Error404';
import Login from '../components/containers/Login';
import InternalLayout from './HOC/InternalLayout';
import Settings from './containers/Settings';
import Dashboard from './containers/Dashboard';

const { reactEndpoints } = constants;
const { login, dashboard, settings } = reactEndpoints;
const routeElement = (path, children) => (
  <Route
    exact
    path={path}
    component={({ match, history }) => (
      <AuthLayout history={history} match={match}>
        <InternalLayout>{children}</InternalLayout>
      </AuthLayout>
    )}
  />
);
const Routes = () => (
  <Switch>
    <Route
      exact
      path={login}
      component={({ match, history }) => (
        <Login history={history} match={match} />
      )}
    />
    {routeElement(dashboard, <Dashboard />)}
    {routeElement(settings, <Settings />)}
    <Route component={() => <Error404 />} />
  </Switch>
);

export default Routes;

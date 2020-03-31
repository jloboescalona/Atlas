import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthLayout } from '../HOC';
import Error404 from '../containers/Error404';
import InternalLayout from '../HOC/InternalLayout';
import endpoints from './endpoints';
import PropTypes from 'prop-types';

const routeElement = ({
  path = '/',
  name = '',
  authenticated = true,
  component
}) => {
  console.log('-->', path);
  return (
    <Route
      key={`key-${name.replace(' ', '-')}`}
      exact
      path={path}
      component={({ match, history }) =>
        authenticated ? (
          <AuthLayout history={history} match={match}>
            <InternalLayout title={name}>
              {React.createElement(component)}
            </InternalLayout>
          </AuthLayout>
        ) : (
          React.createElement(component, { history, match })
        )
      }
    />
  );
};

routeElement.propTypes = {
  path: PropTypes.string,
  name: PropTypes.string,
  authenticated: PropTypes.bool,
  component: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string
  ])
};

routeElement.defaultProps = {
  path: '',
  name: '',
  authenticated: false,
  component: ''
};

function Routes() {
  return (
    <Switch>
      <Route
        exact
        path={login}
        component={({ match, history }) => (
          <Login history={history} match={match} />
        )}
      />
      {Object.values(endpoints)?.map(routes =>
        routes.component
          ? routeElement(routes)
          : Object.entries(routes)?.map(route => routeElement(route))
      )}
      <Route component={() => <Error404 />} />
    </Switch>
  );
}

export default Routes;
export { endpoints };

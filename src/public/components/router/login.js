import React from 'react';
import PropTypes from 'prop-types';
import LoginComponent from '../containers/Login';

const Login = ({ history, match }) => (
  <LoginComponent history={history} match={match} />
);

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({}),
    path: PropTypes.string,
    isExact: PropTypes.bool,
    url: PropTypes.string
  })
};

Login.defaultProps = {
  history: {
    push: () => undefined
  },
  match: {
    params: {},
    path: '',
    isExact: false,
    url: ''
  }
};
export default Login;

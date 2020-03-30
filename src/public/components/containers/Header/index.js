import React, { Fragment } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  CssBaseline,
  Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import User from './User';
import Zone from './Zone';
import { showMenu } from '../../../actions';

const Header = ({ display, displayMenu: displayMenuFromProps, title }) => {
  const displayMenu = () => {
    displayMenuFromProps(!display);
  };
  return (
    <Fragment>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={displayMenu}
            edge="start"
            className=""
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <User />
          <Zone />
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

Header.propTypes = {
  display: PropTypes.bool,
  displayMenu: PropTypes.func,
  title: PropTypes.string
};

Header.defaultProps = {
  display: false,
  displayMenu: () => undefined,
  title: ''
};

const mapStateToProps = state => {
  const { General } = state;
  return {
    display: General.displayMenu
  };
};

const mapDispatchToProps = dispatch => ({
  displayMenu: display => dispatch(showMenu(display))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

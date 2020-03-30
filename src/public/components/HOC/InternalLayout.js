import React from 'react';
import { Drawer, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Header from '../containers/Header';
import Footer from '../containers/Footer';
import PrincipalMenu from '../containers/PrincipalMenu';
import { showMenu } from '../../actions';

const InternalLayout = ({ children, display, displayMenu }) => (
  <Grid container direction="column" style={{ height: '100vh' }}>
    <Header />
    <Drawer anchor="left"  open={display} onClose={() => displayMenu(false)}>
      <PrincipalMenu />
    </Drawer>
    <Grid item xs>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="stretch"
        style={{ height: '100%' }}
      >
        <Grid item xs>
          <PerfectScrollbar>{children}</PerfectScrollbar>
        </Grid>
        <Grid item>
          <Footer />
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

InternalLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string
  ]),
  display: PropTypes.bool,
  displayMenu: PropTypes.func
};

InternalLayout.defaultProps = {
  children: [],
  display: false,
  displayMenu: () => undefined
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
)(InternalLayout);

import React from 'react';
import { Drawer, Box, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../containers/Header';
import Footer from '../containers/Footer';
import PrincipalMenu from '../containers/PrincipalMenu';
import { showMenu } from '../../actions';

const InternalLayout = ({ children, display, displayMenu, title }) => (
  <Box
    style={{
      display: 'flex',
      flexDirection: 'column',
      flexBasis: '100%'
    }}
  >
    <Header title={title} />
    <Drawer anchor="left" open={display} onClose={() => displayMenu(false)}>
      <PrincipalMenu />
    </Drawer>
    <Grid container style={{ flexGrow: 1 }}>
      <Grid item xs={12} style={{ flexGrow: 1, height: '100%' }}>
        {children}
      </Grid>
      <Grid
        item
        xs={12}
        className={'footer'}
        style={{ bottom: 0, position: 'sticky' }}
      >
        <Footer />
      </Grid>
    </Grid>
  </Box>
);

InternalLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string
  ]),
  display: PropTypes.bool,
  displayMenu: PropTypes.func,
  title: PropTypes.string
};

InternalLayout.defaultProps = {
  children: [],
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
)(InternalLayout);

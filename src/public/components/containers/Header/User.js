import React, { useState, useRef, Fragment } from 'react';
import {
  Button,
  Popper,
  Grow,
  Paper,
  MenuItem,
  MenuList,
  ClickAwayListener,
  Divider
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Translate } from '../../HOC';
import constants from '../../../constants'; // aca se puede obtener el logo en base64

const { Language } = constants;
const User = props => {
  const { SignOut } = constants;

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const { current } = anchorRef;
  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = e => {
    if (current && current.contains(e.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <Fragment>
      <Button
        ref={anchorRef}
        color="inherit"
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <AccountCircleIcon />
      </Button>
      <Popper
        open={open}
        anchorEl={current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom'
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow">
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <Divider />
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <Divider />
                  <MenuItem onClick={handleClose}>Logout</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Fragment>
  );
};

User.propTypes = {
  display: PropTypes.bool,
  displayMenu: PropTypes.func
};

User.defaultProps = {
  display: false,
  displayMenu: () => undefined
};

const mapStateToProps = state => {
  const { Opennebula } = state;
  return {
    display: Opennebula.user
  };
};

const mapDispatchToProps = dispatch => ({
  clearData: display => dispatch(showMenu(display))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);

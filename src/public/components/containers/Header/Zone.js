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
import LanguageIcon from '@material-ui/icons/Language';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Translate } from '../../HOC';
import constants from '../../../constants';

const Zone = props => {
  const { SignOut, Language, Groups } = constants;
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
        <LanguageIcon />
        pepe
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
                  <MenuItem onClick={handleClose}>Settings</MenuItem>
                  <Divider />
                  <MenuItem onClick={handleClose}>
                    <Translate word={SignOut} />
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleClose}>
                    <Translate word={Groups} />
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Fragment>
  );
};

Zone.propTypes = {
  display: PropTypes.bool,
  displayMenu: PropTypes.func
};

Zone.defaultProps = {
  display: false
};

const mapStateToProps = state => {
  const { Opennebula } = state;
  return {
    display: Opennebula.user
  };
};

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Zone);

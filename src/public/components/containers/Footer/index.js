import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import classnames from 'classnames';
import constants from '../../../constants';

const { by } = constants;

const Footer = () => (
  <Grid container>
    <Grid item xs={12} className={classnames('footer')}>
      footer
    </Grid>
  </Grid>
);

export default Footer;

import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@material-ui/core';

const PrincipalMenu = () => {
  const { redirect, setRedirect } = useState(false);

  return redirect ? (
    <Redirect to="/" />
  ) : (
    <List>
      <ListItem button onClick={() => setRedirect(true)}>
        <ListItemText primary="Redirect" />
      </ListItem>
      <ListItem button onClick={() => setRedirect(true)}>
        <ListItemText primary="Redirect" />
      </ListItem>
    </List>
  );
};

export default PrincipalMenu;

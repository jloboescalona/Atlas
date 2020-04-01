/* Copyright 2002-2019, OpenNebula Project, OpenNebula Systems                */
/*                                                                            */
/* Licensed under the Apache License, Version 2.0 (the "License"); you may    */
/* not use this file except in compliance with the License. You may obtain    */
/* a copy of the License at                                                   */
/*                                                                            */
/* http://www.apache.org/licenses/LICENSE-2.0                                 */
/*                                                                            */
/* Unless required by applicable law or agreed to in writing, software        */
/* distributed under the License is distributed on an "AS IS" BASIS,          */
/* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.   */
/* See the License for the specific language governing permissions and        */
/* limitations under the License.                                             */
/* -------------------------------------------------------------------------- */

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

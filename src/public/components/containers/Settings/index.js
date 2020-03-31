import React from 'react';
import { Translate } from '../../HOC';
import constants from '../../../constants';

const { settings } = constants;
const Settings = () => (
  <div>
    <Translate word={settings} />
  </div>
);

export default Settings;

const fs = require('fs-extra');
const { messageTerminal } = require('./src/utils');

const pathInternal = 'src/public/assets/';
const pathExternal = 'dist/public/';

const config = {
  color: 'red',
  type: 'ERROR',
  error: '',
  message: 'Static assets copy: %s'
};

const files = [
  {
    internal: `${pathInternal}favicon.png`,
    external: `${pathExternal}favicon.png`
  },
  {
    internal: `${pathInternal}logo.png`,
    external: `${pathExternal}logo.png`
  }
];

try {
  files.forEach(({ internal, external }) => {
    fs.copySync(internal, external);
  });

  const internalConfig = { color: 'green', type: 'OK', error: '' };
  messageTerminal({ ...config, ...internalConfig });
} catch (err) {
  const internalConfig = { error: err.message };
  messageTerminal({ ...config, ...internalConfig });
}

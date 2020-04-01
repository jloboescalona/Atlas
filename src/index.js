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

const compression = require('compression');
const { env } = require('process');
const helmet = require('helmet');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const {
  existsSync,
  accessSync,
  constants: fsConstants,
  createWriteStream,
  readFileSync
} = require('fs-extra');
const { createServer: unsecureServer } = require('http');
const { createServer: secureServer } = require('https');
const bodyParser = require('body-parser');
const { getConfig } = require('./utils/yml-connect');
const {
  defaultConfigLogPath,
  defaultConfigLogFile,
  defaultTypeLog
} = require('./config/defaults');
const publicRoutes = require('./routes/public');
const apiRoutes = require('./routes/api');
const { messageTerminal, addWsServer } = require('./utils');

const app = express();

// user config
const appConfig = getConfig();

// settings
const port = appConfig.PORT || 3000;
const userLog = appConfig.LOG || 'dev';

// ssl
const key = `${__dirname}/../cert/key.pem`;
const cert = `${__dirname}/../cert/cert.pem`;

let log = morgan('dev');
if (userLog === defaultTypeLog) {
  let logPath = `${defaultConfigLogPath}`;
  if (env?.ONE_LOCATION) {
    logPath = env.ONE_LOCATION + logPath;
  }
  try {
    accessSync(logPath, fsConstants.W_OK);
    const logStream = createWriteStream(logPath + defaultConfigLogFile, {
      flags: 'a'
    });
    log = morgan('combined', { stream: logStream });
  } catch (err) {
    console.error('no access!');
  }
}

app.use(helmet.hidePoweredBy());
app.use(compression());

app.use('/static', express.static(path.resolve(__dirname, 'public')));

// log request
app.use(log);

// cors
if (appConfig.CORS) {
  app.use(cors());
}

// post params parser body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.use('/api', apiRoutes);
app.use('/', publicRoutes);

// 404 - public
app.get('*', (req, res) =>
  res
    .status(404)
    .send(
      `<body style="background-color: #3c3c3c;"><h1 style="font-family: sans-serif; color: #c7c7c7; text-align: center;">404 - Not Found</h1></body>`
    )
);

// server
const appServer =
  existsSync && key && cert && existsSync(key) && existsSync(cert)
    ? secureServer(
        {
          key: readFileSync(key, 'utf8'),
          cert: readFileSync(cert, 'utf8')
        },
        app
      )
    : unsecureServer(app);

// connect to zeromq websocket
addWsServer(appServer);

appServer.listen(port, () => {
  const config = {
    color: 'green',
    type: port,
    message: 'Server listen in port %s'
  };
  messageTerminal(config);
});

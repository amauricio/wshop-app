require('dotenv').config();
const { SERVER_HOST, PORT, NODE_ENV } = process.env;

const figlet = require('figlet');
const chalk = require('chalk');
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const swaggerUi = require('swagger-ui-express');

global.appRootPath = require.main.path;

const app = express();
const routesV1 = require('modules');
const commonMiddlewares = require('common/middlewares');


app.use(methodOverride());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);
app.use(cors());
app.use(morgan('tiny'));
const controllers = routesV1({ commonMiddlewares });

app.use('', commonMiddlewares.debugRoute, controllers.router);

app.use(function (data, req, res, next) {
  if (data.constructor.name.indexOf('Error') >= 0 || data.constructor.name.indexOf('Exception') >= 0) {
    const err = data;
    const code = err.code || 100;
    const message = err.message || 'Ocurrió un error.';
    let rr = { status: 'FAILED', error: { code: code, message: message } };

    const content = err.content || false;
    if (content) rr['error']['content'] = err.content;

    if (NODE_ENV == 'dev' || NODE_ENV == 'development') rr['error']['stack'] = err.stack;
    res.status(err.status || 500).json(rr);
  } else {
    return res.status(200).json({ status: 'OK', results: data });
  }
});

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(controllers.apiDoc, {
    customCss: `
    .swagger-ui .topbar { display: none }
    /*.swagger-ui .topbar .wrapper .topbar-wrapper a img { display: none }*/
`,
  }),
);
app.use(function (req, res, next) {
  res.json({"NOT_FOUND":1});
});

const { debugApp } = require('config/debug');

const apiPort = PORT || 8080;

const title = chalk.hex('#ecfA1C')(
  figlet.textSync('wshop', {
    font: 'ANSI Shadow',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: false,
  }),
);

app.listen(apiPort, () => {
  debugApp(`\n${title}`);
  debugApp(`Server running at ${SERVER_HOST}:${apiPort}/`);
  debugApp(`apiDocs server running at ${SERVER_HOST}:${apiPort}/api-docs`);
});

module.exports = app;

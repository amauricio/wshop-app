const debugModule = require('debug');

const debugApp = debugModule('app');
const debugRoute = debugModule('route');
const debugInfo = debugModule('info');

module.exports = {
  debugApp,
  debugRoute,
  debugInfo
};

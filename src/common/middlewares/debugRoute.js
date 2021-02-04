const { debugRoute } = require('config/debug');

const debugRouteMiddleware = (req, res, next) => {
  debugRoute(`${req.method} ${req.originalUrl}`);
  debugRoute(JSON.stringify(req.body, null, 2));
  next();
};
module.exports = debugRouteMiddleware;


const { getWall } = require("modules/explore/wall");

module.exports = (dependencies) => {
    return {
      'explore': [
        {
          method: 'get',
          path: '/wall',
          ctrlMiddleware: getWall(dependencies),
        }
      ]
    };
  };
  
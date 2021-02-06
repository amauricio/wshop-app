
const { getProfile } = require("modules/user/profile");

module.exports = (dependencies) => {
    return {
      'user': [
        {
          method: 'get',
          path: '/profile',
          ctrlMiddleware: getProfile(dependencies),
        }
      ]
    };
  };
  
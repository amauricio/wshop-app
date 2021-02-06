const { createToken } = require("modules/auth/token");
const { checkUser } = require("modules/auth/user");

module.exports = (dependencies) => {
  return {
    'auth/token': [
      {
        method: 'post',
        path: '/',
        ctrlMiddleware: createToken(dependencies),
      }
    ],
    'auth/user': [
        {
          method: 'post',
          path: '/check',
          ctrlMiddleware: checkUser(dependencies),
        }
      ],
  };
};

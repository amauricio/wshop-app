
const { getProfile, hasProfile, createProfile, uploadPicture } = require("modules/user/profile");

module.exports = (dependencies) => {
    return {
      'user': [
        {
          method: 'get',
          path: '/profile',
          ctrlMiddleware: getProfile(dependencies),
        },
        {
          method: 'get',
          path: '/hasProfile',
          ctrlMiddleware: hasProfile(dependencies),
        },
        {
          method: 'post',
          path: '/createProfile',
          ctrlMiddleware: createProfile(dependencies),
        },
        {
          method: 'post',
          path: '/uploadPicture',
          ctrlMiddleware: uploadPicture(dependencies),
        }
      ]
    };
  };
  
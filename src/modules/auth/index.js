
module.exports = (dependencies) => {
  return {
    'auth/token': [
      {
        method: 'post',
        path: '/new'
      }
    ]
  };
};


const validator = require('modules/user/profile/validator');
const getProfile = (dependencies, stage) => async (req, res, next) => {
    next({result:"ok"})
}

module.exports = (dependencies) => [
    validator(dependencies, "validate"),
    getProfile(dependencies, "get-profile")
];
  
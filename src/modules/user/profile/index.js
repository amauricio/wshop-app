
const validator = require('modules/user/profile/validator');
const mock = require("modules/user/profile/mock.json");
const getProfile = (dependencies, stage) => async (req, res, next) => {
    next(mock)
}

module.exports = (dependencies) => [
    validator(dependencies, "validate"),
    getProfile(dependencies, "get-profile")
];
  
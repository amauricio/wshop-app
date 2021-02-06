
const tokenValidation = require('common/middlewares/tokenValidation');
const validator = require('modules/user/profile/validator');
const mock = require("modules/user/profile/mock.json");
const _getProfile = (dependencies, stage) => async (req, res, next) => {
    next(mock)
}

exports.getProfile = (dependencies) =>[
    tokenValidation(dependencies, "validate"),
    validator(dependencies, "validate"),
    _getProfile(dependencies, "get-profile")
];
exports.createProfile = (dependencies) =>[
    tokenValidation(dependencies, "validate"),
    validator(dependencies, "validate"),
    _getProfile(dependencies, "get-profile")
];
  
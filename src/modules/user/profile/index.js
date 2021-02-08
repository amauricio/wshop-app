
const tokenValidation = require('common/middlewares/tokenValidation');
const getProfileValidator = require('modules/user/profile/get.validator');
const createProfileValidator = require('modules/user/profile/create.validator');
const mock = require("modules/user/profile/mock.json");


const _getProfile = (dependencies, stage) => async (req, res, next) => {
    const {
        commonModels: { UserPgModel },
      } = dependencies;
    const { user } = req;
    const userData = await UserPgModel.findOne({where:{ username : user.username }});
    const {username, token, createdAt} = userData;
    next({username, token, createdAt});
}

const _hasProfile = (dependencies, stage) => async (req, res, next) => {
    const {
        commonModels: { ProfilePgModel },
      } = dependencies;
    const { user } = req;
    const userData = await ProfilePgModel.findOne({where:{ userId : user.id }});
    let hasProfile = false;
    if(userData) hasProfile = true;
    next({hasProfile});
}
const _createProfile = (dependencies, stage) => async (req, res, next) => {
    const {
        commonModels: { ProfilePgModel, UserPgModel },
      } = dependencies;
}

const _uploadPicture = (dependencies, stage) => async (req, res, next) => {
    console.log(req.files)
    next({urlPicture:"http://"})
}

exports.getProfile = (dependencies) =>[
    tokenValidation(dependencies, "validate"),
    getProfileValidator(dependencies, "validate"),
    _getProfile(dependencies, "get-profile")
];
exports.hasProfile = (dependencies) => [
    tokenValidation(dependencies, "validate"),
    _hasProfile(dependencies, "has-profile")
]
exports.uploadPicture = (dependencies) =>[
    tokenValidation(dependencies, "validate"),
    _uploadPicture(dependencies, "upload-picture")
]

exports.createProfile = (dependencies) =>[
    tokenValidation(dependencies, "validate"),
    createProfileValidator(dependencies, "validate"),
    _createProfile(dependencies, "create-profile")
];
  
const { generateToken } = require('common/helpers/bcrypt');
const { RestException, errors } = require('modules/rest.exception');

const validator = require('modules/auth/token/create.validator');
const _createToken = (dependencies, stage) => async (req, res, next) => {
    //register if not exist
    const {
        commonModels: { UserPgModel },
      } = dependencies;
    
    const { username, secret } = req.body;
    const prepData = { username,secret, token: generateToken(32) };
    const user = await UserPgModel.findOne({ where: { username  }});
    if(user){
        //not registered
        if(user.secret == secret){
            UserPgModel.update({ token: prepData.token }, { where: { username } });
        }else{
            throw new RestException(errors.LOGIN_FAILED, "Unauthorized");
        }
    }else{
        UserPgModel.create(prepData);
    }
    next(prepData);
}


exports.createToken = (dependencies) =>[
    validator(dependencies, "validate"),
    _createToken(dependencies, "get-profile")
];
  

const validator = require('modules/auth/user/check.validator');
const _checkUser = (dependencies, stage) => async (req, res, next) => {
    //register if not exist
    const {
        commonModels: { UserPgModel },
      } = dependencies;
    const { username } = req.body;
    const response = {};
    const user = await UserPgModel.findOne({ where: { username }});
    if(!user){
        //not exist --
        response.exists = false; 
    }else{
        response.exists = true; 
    }
    next(response);
}


exports.checkUser = (dependencies) =>[
    validator(dependencies, "validate"),
    _checkUser(dependencies, "check-user")
];
  
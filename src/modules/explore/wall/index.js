
const tokenValidation = require('common/middlewares/tokenValidation');
const mock = require("modules/explore/wall/mock.json");


const _getWall = (dependencies, stage) => async (req, res, next) => {
 
}


exports.getWall = (dependencies) =>[
    tokenValidation(dependencies, "validate"),
    _getWall(dependencies, "get-wall")
];
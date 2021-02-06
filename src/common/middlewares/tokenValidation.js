const { RestException, errors } = require('modules/rest.exception');

module.exports = (dependencies) => async (req, res, next) => {
  try {
    const {
      commonModels: { UserPgModel },
    } = dependencies;
    const {
      headers: { 'x-api-key': apiKey },
    } = req;
    if (!apiKey) {
      throw new RestException(errors.INVALID_APIPKEY, "Unauthorized");
    }
    const user = await UserPgModel.findOne({ where: { token:apiKey } });
    if (!user) {
      throw new RestException(errors.INVALID_APIPKEY, "Unauthorized");
    }
    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
};

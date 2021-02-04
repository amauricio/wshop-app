module.exports = (dependencies) => async (req, res, next) => {
  try {
    const {
      commonHelpers: { RestObjectException, jwt },
      commonModels: { UserPgModel },
    } = dependencies;
    const {
      headers: { 'x-api-key': apiKey },
    } = req;
    if (!apiKey) {
      throw new RestObjectException({ message: 'Authorization header required', statusCode: 400, errorCode: 107 });
    }
    const user = await UserPgModel.findOne({ where: { apiKey } });
    if (!user) {
      throw new RestObjectException({ message: 'Unauthorized', statusCode: 401, errorCode: 108 });
    }
    req.user = user;
    next();
  } catch ({ message, statusCode, errorCode }) {
    return res.status(400).json({ error: message, errorCode });
  }
};

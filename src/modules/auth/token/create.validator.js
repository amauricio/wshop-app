const Joi = require('joi');
const { RestException, errors } = require('modules/rest.exception');

module.exports = (dependencies) => async (req, res, next) => {
  const validator = Joi.object({
    username: Joi.string(),
    secret : Joi.string()
  });

  const { error, value } = validator.validate(req.body);
  if (error) {
    throw new RestException(errors.ERROR_VALIDATION, error.details);
  }
  return next();
};

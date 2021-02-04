const errors = {
   
    "ERROR_SERVICE" : {
        status: 500,
        code : 101,
        message : "Error al consultar el servicio."
    },
    "ERROR_VALIDATION" : {
        status: 400,
        code : 102,
        message : "Error al validar los campos."
    },
    "INVALID_APIPKEY" : {
        status: 500,
        code : 103,
        message : "api-key invalid."
    }
}

class RestException extends Error {
  constructor(err, content) {
    super(err.message);
    this.content = content || err.message;
    this.code = err.code || 100;
    this.status = err.status || 500;
  }
}

module.exports = {
  RestException,
  errors
};

const { EErrors } = require("../../utils/errors/enums");
const { logger } = require("../../utils/loggers");


const errorHandleMidd = (error, req, res, next) => {
    logger.error(error.cause)
    switch (error.code){
        case EErrors.INVALID_TYPE_ERROR:
            return res.send({status: `error`, error: error.name})
            break;

        default:
            return res.send({status: `error`, error: `Error de Server`})
            break;
        }
}

module.exports = errorHandleMidd
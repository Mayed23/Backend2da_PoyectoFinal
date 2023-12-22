const { logger } = require("../loggers")

const generateErrorInfo = (prodMonk) => {
    logger.info(prodMonk)
    return `one or more properties were incomplete or not valid.
    List of require properties:
    * title nedds to be a string, recived ${prodMonk.title}
    * description: nedds to be a string, recived ${prodMonk.description}
    * price: nedds to be a string, recived ${prodMonk.price}`
}

module.exports = {
    generateErrorInfo
}
const { logger } = require("../loggers");

const CustomError = ({ name = `Error`, cause, message, code=1 }) =>{
     
   const error = new Error(message);
    try {
        
        error.name = name;
        error.code = code;
        error.cause = cause;


        throw error

     } catch (error) {
      logger.error(error)
     }
}
    

module.exports = { CustomError }
const bcrypt = require (`bcrypt`)
const { logger } = require("./loggers")



const  createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

const isValidPass = (password, user) => {
    logger.info(password, user.password,(password === user.password))
    const response =  bcrypt.compareSync(password, user.password)
    logger.info(password, user.password,response)
    
    return response
}

module.exports = {
    createHash, isValidPass
}
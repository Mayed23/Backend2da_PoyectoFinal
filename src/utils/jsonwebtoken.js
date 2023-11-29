const jwt = require (`jsonwebtoken`)
const { configObject: { privateKey} } = require("../config/confi")



const private_key = privateKey


const generateToken = (user) => {
    const token = jwt.sign({ user }, private_key, { expiresIn: `24h`})
    return token
}

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, private_key)
        return decoded
    } catch (error){
        return null
    }
}


module.exports = {
    generateToken, verifyToken
}
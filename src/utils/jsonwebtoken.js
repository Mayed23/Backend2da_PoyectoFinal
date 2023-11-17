const jwt = require (`jsonwebtoken`)


const private_key = process.env.PRIVATE_KEY 
console.log(private_key)

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
const jwt = require(`jsonwebtoken`)


const PRIVATE_KEY = `SecretKeyForToken`

const generateToken = () => {
    const token = jwt.sign({user}, PRIVATE_KEY, { expiresIn: `24h`})
    return token
}

const authToken =  (req, res, next) => {
    const authHeader = req.headers[`authorization`]
    if(!authHeader){
        return res.status(401). json({status: `error`, error: `Not Autenticated`})
    }
    const token = authHeader.split(` `)[1]
    jwt.verify(token, PRIVATE_KEY, (error, credential) => {
        if(error){
            return res.status(403).json({status: `error, error: NOT Authorizated`})
        }
        req.user = credential.user
        next()
    })
}


module.exports = { generateToken, authToken }
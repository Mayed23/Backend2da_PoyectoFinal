const jwt = require (`jsonwebtoken`)

const private_key = `SecretKeyFuncionaParaFirmarToken` 

exports.generateToken =(user) => jwt.sign(user, private_key, { expiresIn: `24h`})
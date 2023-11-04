const passport = require (`passport`)
const pjwt = require (`passport-jwt`) 


const JWTStrategy = pjwt.Strategy
const ExtractJWT = pjwt.ExtractJwt

const initializePassport = () => {
    //Extraer el token de  la cookie
    const cookieExtrator = req => {
        let token = null 
            console.log(`cookie extractor:`. req.cookie)
        if (req && req.cookies) {
            token = req.cookies[`cookieToken`]
                console.log(`token extraxtros:`, token)
        }
        return token
    }
    

    //middleware de passport
    passport.use(`jwt`, new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtrator]),
        secretOrKey: `SecretKeyFuncionaParaFirmarToken`
    }, async (jwt_payload, done) => {
        try{
            return done(null, jwt_payload)
        }catch(error){
            return done(error)
        }
    }))
}       



module.exports = {
    initializePassport
}


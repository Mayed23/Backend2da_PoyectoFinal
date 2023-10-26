const passport = require (`passport`)
const local = require (`passport-local`)
const { userModel } = require (`../Dao/Mongo/models/user.model.js`) 
const { createHash, invalidPassword } = require (`../utils/hash.js`)

const localStrategy = local.Strategy
const initializapassport = () => {
    passport.use(`register`, new localStrategy({
        passReqToCallback: true, //para acceder a la request
        usernameField: `email` //para cambiar user.name por email
    }, async (req, username, password, done) => {
        try{
            

        }catch(error){
            return done(`Error al obtener el usuario ${error}`)
        }
    })) //middleware/strategy: en passport utiliza sus propio middleware
    
    
    passport.use(`register`, new localStrategy({

    }))
}
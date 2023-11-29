const passport = require (`passport`)
const pjwt = require (`passport-jwt`)
const GitHubStrategy = require (`passport-github2`)
const local = require(`passport-local`)
const { createHash, isValidPass } = require(`../utils/hash.js`)
const { userService } = require("../routes/service/service.js")



const JWTStrategy = pjwt.Strategy
const ExtractJWT = pjwt.ExtractJwt
const localStrategy = local.Strategy




const initializePassport = () => {
    //Extraer el token de  la cookie
    const cookieExtrator = req => {
        let token = null 
            //console.log(`cookie extractor:`. req.cookie)
        if (req && req.cookies) {
            token = req.cookies[`cookieToken`]
                console.log(`token extraxtros:`, token)
        }
        return token
    }
    

    //middleware de passport
    passport.use(`jwt`, new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtrator]),
        secretOrKey: process.env.PRIVATE_KEY
    }, async (jwt_payload, done) => {
        try{
            return done(null, jwt_payload)
        }catch(error){
            return done(error)
        }
    }))
    passport.use (
        `register`,
        new localStrategy({ passReqToCallback: true, usernameField: `email`}, async (req, username, password, done) => {
          const { first_name, last_name, age, email } = req.body
          try{
            let user = await userService.getUserByEmail(username)
            if (user) {
              console.log(`Usuario ya existe`)
              return done (null,false)
            }
            const newUser = {
              first_name,
              last_name,
              age,
              email,
              password: createHash(password),
              role
            }
            let result = await userService.createUser(newUser)
            return done(null, result)
          }catch(error){
            return done(`Error al ingresar el usuario` + error)
          } 
        })
    )

    passport.use(`login`, new localStrategy({usernameField: `email`}, async (username, password, done) =>{
        try{
          const user = await userService.getUserByEmail(username)
          if (!user){
            console.log(`EL usuario no Existe`)
            return( null, false)
          }
          if(!isValidPass(user, password)) return done (null, false)
          return (null, user)
    
        }catch (error){
          return done(`Error, datos incorrectos` + error )
        }
    }))
    

    passport.use(`github`, new GitHubStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL 
    }, async (accessToken, refreshToken, profile, done) => {
        //console.log(`profile:`, profile)
        try{
        const user = await userService.getUserByEmail(profile._json.email)
        console.log(user)
        if(!user){
            const email = profile._json.email 
            const newUser = {
            first_name: profile._json.name,
            last_name: ``,
            age: 18,
            email,
            password: ``,
            role: ``,
            }
            const result = await userService.createUser(newUser)
            return done(null, result)
        }
        return done(null, user)

        }catch(error){
        return done(`Error, datos incorrectos` + error )
        }
    })) 
    
    passport.serializeUser((user, done) => {
        done(null, user) // null: indica que no hay error, _id: id del usuario
      })
      
      passport.deserializeUser(async(id, done) => {
        let user = await userService.getUserById(id)
        done(null, user._id)
      })



}   



module.exports = {
    initializePassport
}


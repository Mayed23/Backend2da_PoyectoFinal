const passport = require (`passport`)
const pjwt = require (`passport-jwt`)
const GitHubStrategy = require (`passport-github2`)
const local = require(`passport-local`)
const { createHash, isValidPass } = require(`../utils/hash.js`)
const { userService } = require("../service/service.js")
const { logger } = require("../utils/loggers.js")



const JWTStrategy = pjwt.Strategy
const ExtractJWT = pjwt.ExtractJwt
const localStrategy = local.Strategy




const initializePassport = () => {
  //Extraer el token de  la cookie
  const cookieExtrator = req => {
      let token = null 
          //logger.info(`cookie extractor:`. req.cookie)
      if (req && req.cookies) {
          token = req.cookies[`cookieToken`]
              logger.info(`token extraxtros:`, token)
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
        const { first_name, last_name, age, email, role } = req.body
        try{
          let user = await userService.getByEmail(username)
          if (user) {
            logger.info(`Usuario ya existe`)
            return done (null, false)
          }
          // crear carrito para el usuario
          const cart = await cartService.create({ products: [] });
          const newUser = {
            first_name,
            last_name,
            age,
            email,
            password: createHash(password),
            role,
            cart: cart._id,
          }
          let result = await userService.create(newUser)
          console.log(result);
          return done(null, result)
        }catch(error){
          return done(`Error al ingresar el usuario` + error)
        } 
      })
  )

  passport.use(`login`, new localStrategy({usernameField: `email`}, async (username, password, done) =>{
      try{
        const user = await userService.getByEmail(username)
        if (!user){
          logger.info(`EL usuario no Existe`)
          return done (null, false)
        }
        if (!isValidPass(password, user)){
          logger.info(`Contraseña incorrecta`)
          return done (null, false)
        }

        return done(null, user)
       
      }catch (error){
        return done(`Error, datos incorrectos` + error.message)
      }
  }))
  

  passport.use(`github`, new GitHubStrategy({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL 
  }, async (accessToken, refreshToken, profile, done) => {
      //console.log(`profile:`, profile)
      try{
      const user = await userService.getByEmail(profile._json.email)
      logger.info(user)
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
          const result = await userService.create(newUser)
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
      let user = await userService.getById(id)
      done(null, user._id)
    })



}   

module.exports = {
  initializePassport
}

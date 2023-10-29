const passport = require(`passport`);
const GithubStrategy = require (`passport-github2`)
const { userManagerMongo } = require(`../Dao/Mongo/userManager.js`);
const local = require(`passport-local`);
const { createHash, isValidPass } = require(`../utils/hash.js`);


const localStrategy = local.Strategy;
const userService = new userManagerMongo()

const initializaPassport = () => {
  passport.use(
    `register`,
    new localStrategy(
      {
        passReqToCallback: true, //para acceder a la request
        usernameField: `email`, //para cambiar user.name por email
      },
      async (req, username, password, done) => {
        const { first_name, last_name, age, email, role } = req.body;
        try {
          const user = await userService.getUser({email: username});
          if (user) {
            console.log(`user ya existe`);
            return done(null, false);
          }
          const newUSer = {
            first_name,
            last_name,
            age,
            email,
            password: createHash(password),
            role,
          };
          const result = await userService.createUser(newUSer);
          return done(null, result);
        } catch (error) {
          return done(`Error al obtener el usuario ${error}`);
        }
      }
    )
  ); //middleware/strategy: en passport utiliza sus propio middleware

    passport.use(`login`, new localStrategy({
        usernameField: `email`
         }, async(username, password, done) => {
            try{
                const user = await userService.getUser({email: username})
                if(!user){
                    console.log(`Usuario no existe`)
                    return done(null, false)
                }
                if(!isValidPass(password, user)) return done(null, false)
                return done(null, user)
            }catch(error){
                return done(error)

            }

})),
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser(async() => {
        let user = await userService.getUser({_id: id})
        done(null, user)
    })
}

passport.use(`github`, new GithubStrategy({

    clientID: `Iv1.62904e5ec63cead5`,
    clientSecret: `bca181fea899b7e5f55acea61d71d41a27896e5e`,
    callbackURL: `http://localhost:8080/api/sessions/githubcallback` 

}, async (accessToken, refreshToken, profile, done) => {
    // console.log(`profile:`, profile)
    try{
        let user = await userService.getUser({email: profile._json.email})
        if(!user){
            let newUser ={
                first_name: profile.username,
                last_name: profile.username,
                age: profile.username,
                email: profile._json.email,
                password: ``,
                role:``
            }
            let userReg = await userService.createUser(newUser)
            return done(null, userReg)
        }
        return done(null, user)
    }catch{
        
        return done("Error al obtener el usuario" + error);

    }
}) )


module.exports = { initializaPassport }







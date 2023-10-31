const passport = require(`passport`);
const GithubStrategy = require (`passport-github2`)
const { userManagerMongo } = require(`../Dao/Mongo/userManager.js`);
const local = require(`passport-local`);
const { createHash, isValidPass } = require(`../utils/hash.js`);


const localStrategy = local.Strategy;
const userService = new userManagerMongo()

const initializePassport = () => {
  passport.use(
    `register`,

    new localStrategy({ passReqToCallback: true, usernameField: `email` }, async (req, username, password, done) => {
      const { first_name, last_name, age, email } = req.body;

      try {
        let user = await userService.getUserByEmail(username);
        if (user) {
          console.log("Usuario ya existe");
          return done(null, false);
        }

        const newUser = {
          first_name,
          last_name,
          age,
          email,
          password: createHash(password),
        };

        let result = await userService.createUser(newUser);
        return done(null, result);
      } catch (error) {
        return done("Error al obtener el usuario" + error);
      }
    })
  );

   passport.use(`login`, new localStrategy({ usernameField:`email` }, async (username, password, done) => {
    try {
      const user = await userService.getUserByEmail(username);
      if (!user) {
        console.log("El usuario no existe");
        return done(null, false);
      }

      if (!isValidPass(user, password)) return done(null, false);

      return done(null, user);

    }
    catch (error) {
      return done("Error al obtener el usuario" + error);
    }
  }));

passport.use("github", new GithubStrategy({
    clientID: `Iv1.62904e5ec63cead5`,
    clientSecret: `bca181fea899b7e5f55acea61d71d41a27896e5e`,
    callbackURL: `http://localhost:8080/api/sessions/githubcallback`
  }, async (accessToken, refreshToken, profile, done) => { 
    try {
     
      const user = await userService.getUserByEmail(profile._json.email);
      if (!user) {
      
        const email = profile._json.email || profile._json.id;
        const newUser = {
          first_name: profile._json.name,
          last_name: "",
          age: 20,
          email,
          password: "",
        }
        const result = await userService.createUser(newUser);
        return done(null, result);
      }

      return done(null, user);

    }
    catch (error) {
      return done("Error al obtener el usuario" + error);
    }
  }));

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await userService.getUserById({_id: id});
    done(null, user);
  });

};



module.exports = { initializePassport }







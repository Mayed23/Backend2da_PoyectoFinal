const passport = require("passport");
const { Strategy } = require("passport-jwt");




exports.passportCall = Strategy => {
    return async (req, res, next) => {
        passport.authenticate(Strategy, function(err, user, info){
            if(err) return next(err)
            if(!user) return res.status(401).send({status: `error`, error: info.message ? info.message : info.toString()})
            req.use = user
            next()
        })(req, res, next)
    }
}

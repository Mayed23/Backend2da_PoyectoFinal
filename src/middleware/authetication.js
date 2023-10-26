function authenticate(req,res,nex) {
    if(req.session?.user != user.email || !req.session?.admin) {
        return res.status(401).send(`error de autorización`)
    }
    return next()

}

module.exports = authenticate
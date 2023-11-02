exports.authorization = roleArray => {
    return async (req, res, next) => {
        try{
            if(!req.user) return res.status(401).send({status: `error`, error: `Unauthorized`})
            if(!roleArray.include(req.user.role.toUpperCase())) return res.status(401).send({status: `error`, error: `Not Permissions`})
            next()
        }catch(error){
            console.log(error)

        }
    }
}
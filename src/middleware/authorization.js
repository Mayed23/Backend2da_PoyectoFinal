exports.authorization = roleArray => {
    return async (req, res, next) => {
        try{
            if(req.user.role === `admin`) {
                next()
            }else{
                return res.status(401).send({status: `error`, error: `Unauthorized`})
            }    
        }catch(error){
            console.log(error)

        }
    }
}
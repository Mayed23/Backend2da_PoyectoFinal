exports.authorization = (role)=> {
    return async (req, res, next) => {
        console.log(`role:`, role)
        console.log(`REQ:`, req.user)
       
        try{
            if (!req.user) return res.status(401).json({status: `error`, error: `Unauthorizaed`})

            if(req.user.role === role ) {
                
                next()
            }else{
                return res.status(401).send({status: `error`, error: `Not Permissions`})
            }    
        }catch(error){
            console.log(error)

        }
    }
}
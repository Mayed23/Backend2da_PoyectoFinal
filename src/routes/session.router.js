const { Router } = require(`express`)
const { userManagerMongo } = require("../Dao/Mongo/userManager.js")
const { userModel } = require("../Dao/Mongo/models/user.model.js")



const sessionsRouter = Router()
const userReg = new userManagerMongo()


sessionsRouter.post(`/register`, async (req, res)=>{
  
    try{
        const newUser = req.body
        await userReg.createUser(newUser)
        console.log(newUser)
        res.redirect(`register`)
    
        }catch(error) {
        console.log(error)
    }
    
})

sessionsRouter.post(`/login`, async (req, res)=>{
   
    try{
        email.user = req.body.email
        const confir = await userReg.getUser(email)
        if(confir.password === req.body.password){
            if(confir.role === `admin`){
                req.session.emailUser = email
                req.session.nameUser = confir.first_name
                req.session.lastNaUser =  confir.last_name
                req.session.roleUser = confir.role
                res.redirect(`/profile`)
            }else{
                req.session.emailUser = email
                req.session.roleUser = confir.role
                res.redirect(`/users`)

            }
        }else{
            res.redirect(`/login`)
        }
    }catch(error){
        res.status(500).send(`Usuario no registrado:`+ error.message)
    }
    
})








module.exports = sessionsRouter
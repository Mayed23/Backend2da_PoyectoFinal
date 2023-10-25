const { Router } = require(`express`)
const { userManagerMongo } = require("../Dao/Mongo/userManager.js")
const { authenticate, Passport } = require("passport")
const passport = require("passport")
const { userModel } = require("../Dao/Mongo/models/user.model.js")



const sessionsRouter = Router()
const userReg = new userManagerMongo()


sessionsRouter.post(`/register`, passport.authenticate(`register`), async (req, res)=>{
  
    const {first_name, last_name, age, email, password} = req.body
    try{
        const user = await userReg.getUsersByEmail(email)
        if(user){
            return res.status(404).json({error: `el ${email} ya existe`})
        }
        if(!first_name || !last_name || !age || !email || !password){
            return res.status(404).json({error: `Ingrese todos los`})
        }
        const newUser = await userReg.createUser(newUser)
        console.log(newUser)
        res.redirect(`/login`)
    
        }catch(error) {
        res.status(500).send(`Error en el registrio:` + error.message) 
    }
    
})

sessionsRouter.post(`/login`, async (req, res)=>{
    const { email, password } = req.body
   
    try{
        const confirUser = await userReg.getUsersByEmail(email)
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
        res.redirect(`/register`)
    }
    
})
sessionsRouter.get(`/logout`, async (req, res) =>{
    try{
        req.session.destroy((error) => {
            if(error) {
                return res.status(500).json({error: `La sesión no se ha cerrado correctamente`})
            }
            res.json({ msg: `Sesión cerrada con éxito`})
        })
    }catch(error){
        console.log(error)
    }
        
})









module.exports = sessionsRouter
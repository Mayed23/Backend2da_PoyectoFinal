const { Router } = require(`express`)
const { userManagerMongo } = require("../Dao/Mongo/userManager.js")
const { userModel } = require("../Dao/Mongo/models/user.model.js")
const { create } = require("connect-mongo")
const { createHash, isValidPass } = require("../utils/hash.js")
// const { authenticate, Passport } = require("passport")
// const passport = require("passport")



const sessionsRouter = Router()
const userReg = new userManagerMongo()

sessionsRouter.post(`/login`, async (req, res)=>{
    const { email, password } = req.body
    console.log(email,password)
    try{
        const user = await userReg.getEmail({email})
        if (!user || user.password !== password){
            return res.status(404).json({status: `error`, error: `Usuario no encontrado`})
        }
        if(!isValidPass(password, user)) return res.status(401).send({status: `error`, error: `Password incorrecto`})

        const {first_name, last_name, age, email: emailUser} = user
        if (email === email.user || password === password.user){
            req.session.user={
                first_name,
                last_name,
                age,
                email: emailUser,
                role: `admin`
            }
        } else{
            req.session.user={
                first_name,
                last_name,
                age,
                email: emailUser,
                role: `user`
            }
        }
        return res.json({user: req.session.user})
    }catch(error){
        console.log(error)
    }    

})     


sessionsRouter.post(`/register`,async (req, res)=>{
  
    const {first_name, last_name, age, email, password, role} = req.body
    try{

        if(!first_name || !last_name || !age || !email || !password || !role){
            return res.status(404).json({error: `Ingrese todos los datos`})
        }
        const user = await userReg.getUserByEmail(email)
        if(user){
            return res.status(404).json({error: `el ${email} ya existe`})
        }
        
        const newUser = await userReg.createUser({
            first_name,
            last_name,
            age,
            email,            
            password: createHash(password),
            role
          })
        console.log(newUser)
        res.redirect(`/login`)
        
        }catch(error) {
            console.log(error)
        res.status(500).send(`Error en el registrio:` + error.message) 
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
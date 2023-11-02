const { Router } = require("express")
const { userManagerMongo } = require("../../Dao/Mongo/userManager.js")
const { authenticate, Passport } = require("passport")
const passport = require("passport")
const { isValidPass, createHash } = require("../../utils/hash.js")
const generateToken = require ("../../utils/jsonwebtoken.js")


const sessionsRouter = Router()
const userReg = new userManagerMongo()


sessionsRouter.post(`/register`, passport.authenticate(`register`), async (req, res)=>{
  
    const {first_name, last_name, age, email, password, role} = req.body
    try{
        const user = await userReg.getUsersByEmail(email)
        if(user){
            return res.status(404).json({error: `el ${email} ya existe`})
        }
        if(!first_name || !last_name || !age || !email || !password || !role){
            return res.status(404).json({error: `Ingrese todos los datos`})
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
        res.status(500).send(`Error en el registrio:` + error.message) 
    }
    
})

sessionsRouter.post(`/login`, async (req, res)=>{
    const { email, password } = req.body
    console.log(req.body)
    const user = await userReg.getUsersByEmail(email)
    console.log(user)
    if(!user) return res.status(401).send({status: `error`, error: `El Usuario no existe`})
    
    if(!isValidPass(password, user)){
        return res.status(401).send({status: `error`, error: `Datos incorrectos`})
    }
    const token = generateToken({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role
    })

    res.cookie(`cookieToken`, token, {
        maxAge: 60*60*10000,
        httpOnly: true
    }).status(200).send({
        status: `success`,
        token: token,
        message: `loggen successfully`
    })
    
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
const { Router } = require(`express`)
const { userManagerMongo } = require(`../Dao/Mongo/userManager.js`)
// const { create } = require(`connect-mongo`)
const  passport  = require(`passport`)
const { generateToken } = require("../utils/jsonwebtoken.js")



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
        
        const confirmUser = await userReg.getUserByEmail(email)
        
        // Si no encontramos un usuario tenemos que devolver una respuesta de error informando que el usuario no existe
        if(!confirmUser){
            return res.status(404).json({error: `el ${email} no existe`})
        }

        // Si encontramos un usuario tenemos que comparar la contraseña que nos envían con la que tenemos almacenada en la base de datos
        if (confirmUser.password !== password) { 
            return res.status(401).json({ error: `Contraseña incorrecta` })
        }

        // Si el usuario existe y la contraseña es correcta tenemos que devolver una respuesta asigamos el usuario a la sesión
        req.session.user = confirmUser;
        res.redirect(`/profile`)

        const accessToken = generateToken({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: `user`
        })

        return a

    } catch (error) {
        res.status(500).send(`Error en el login:` + error.message)
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

sessionsRouter.get(`/github`, passport.authenticate(`github`, { scope: [`user:email`]}), async (req, res) => { });

sessionsRouter.get(`/githubcallback`, passport.authenticate(`github`, { failureRedirect: `login` }), async (req, res) => {
  req.session.user = req.user;
  res.redirect(`/profile`);
});

module.exports = sessionsRouter
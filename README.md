- Integración a DB
- crear servidor
- sistema mongo DB - mongoose
- multer - subir archivos - configurar handlebars


Nota la versión 7 de handlebars, suele dar errores# Backend2da_PoyectoFinal

//Código antes de reestructurar Register:

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

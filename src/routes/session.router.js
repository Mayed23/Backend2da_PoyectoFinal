const { Router } = require(`express`)
// const { userManagerMongo } = require(`../Dao/Mongo/userManager.js`)
// const { create } = require(`connect-mongo`)
const  passport  = require(`passport`)



const sessionsRouter = Router()
// const userReg = new userManagerMongo()

sessionsRouter.post (`/login`, passport.authenticate(`login`, { failureRedirect: `faillogin`}), async (req, res)=> {
    if(!req.user) return res.status(400).send({status:`error`, message: `Error usuario incorrecto`})

    const { first_name, last_name, age, email, role } = req.user;

        req.session.user={
            first_name,
            last_name,
            age,
            email,
            role
        }
    res.send({ status:`success`, payload: req.user})   

})  


sessionsRouter.get(`/faillogin`, (req, res) => {
    res.send({ error: `Error, usurio incorrecto`});
  });




sessionsRouter.post(`/register`, passport.authenticate(`register`, {
    failureRedirect:`failregister`}), async (req, res)=>{
        res.send({status: `success`, message: `Usuario ya existe`})
      
})
sessionsRouter.get(`/fileregister`, async (req,res) => {
    res.status(401).send({ status: `error`, message: `Error!!, Ususario no registrado`})
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

sessionsRouter.get(`/github`, passport.authenticate(`github`, { scope: [`user:email`] }), async (req, res) => { });

sessionsRouter.get(`/githubcallback`, passport.authenticate(`github`, { failureRedirect: `login` }), async (req, res) => {
  req.session.user = req.user;
  res.redirect(`/profile`);
});

module.exports = sessionsRouter
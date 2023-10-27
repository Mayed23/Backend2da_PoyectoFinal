const { Router } = require(`express`)
const { userManagerMongo } = require(`../Dao/Mongo/userManager.js`)
const { create } = require(`connect-mongo`)
const { createHash, isValidPass } = require(`../utils/hash.js`)
const passport = require(`passport`)



const sessionsRouter = Router()
const userReg = new userManagerMongo()

sessionsRouter.post(`/login`, passport.authenticate(`login`, {failureRedirect: `faillogin`}), async (req, res)=>{
    if(!req.user) return res.status(400).send({status: `error`, message: `Error, usurio incorrecto`})
    const { firts_name, last_name, age, email } = req.user;

        req.session.user={
            first_name,
            last_name,
            age,
            email,
        }
     res.send({ status:`success`, payload: req.user})   

})  


sessionsRouter.get(`/faillogin`, (req, res) => {
    res.send({ error: `Error, usurio incorrecto`});
  });




sessionsRouter.post(`/register`, passport.authenticate(`register`, {
    failureRedirect:`/failregister`}), async (req, res)=>{
        res.send({status: `success`, message: `El registro fue exitoso`})
      
})
sessionsRouter.get(`/fileregister`, async (req,res) => {
    console.log(`Faile strategy`)
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
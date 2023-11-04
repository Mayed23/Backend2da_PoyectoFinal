const { Router } = require(`express`)
const  passport  = require(`passport`)



const sessionsRouter = Router()


sessionsRouter.post(`/login`, passport.authenticate(`login`, {
  failureFlash: `faillogin`}), async (req, res) => {
    if(!req.user) return res.status(400).send({ status: `error`, message: `Datos inválidos`})
    const { first_name, last_name, age, email} = req.user
    req.session.user = {
      first_name,
      last_name,
      age,
      email
    }
    res.send({ status: `success`, payload: req. user })
  })
sessionsRouter.get(`/faillogin`, (req, res) => {
  res.send({ error: "Error datos inválidos" })
})  

sessionsRouter.post(
    `/register`,
    passport.authenticate(`register`, { failureRedirect: `failregister` }),
    async (req, res) => {
      res.send({ status: `success`, message: `Usuario existe` });
    }
  );
  
sessionsRouter.get(`/failregister`, (req, res) => {
    res.status(401).send({ status: `error`, message: `Error Usuario no registrado` });
});


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

sessionsRouter.get(`/githubcallback`, passport.authenticate(`github`, { failureRedirect: `/login` }), async (req, res) => {
  req.session.user = req.user;
  res.redirect(`/profile`);
});

module.exports = sessionsRouter
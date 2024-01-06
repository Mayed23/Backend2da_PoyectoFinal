const { Router } = require(`express`)
const  passport  = require(`passport`)



const sessionsRouter = Router()


sessionsRouter.post(
  `/login`,
  passport.authenticate(`login`, {
    failureRedirect: `faillogin`,
  }),
  async (req, res) => {
    req.session.user = req.user;

    res.send({ status: `success`, payload: req.user });
  }
);
sessionsRouter.get(`/faillogin`, (req, res) => {
  res.send({ error: "Error datos inválidos" });
});

sessionsRouter.post(
  `/register`,
  passport.authenticate(`register`, { failureRedirect: `failregister` }),
  async (req, res) => {
    req.session.user = req.user;
    res.send({ status: `success`, message: req.user });
  }
);

sessionsRouter.get(`/failregister`, (req, res) => {
  res.status(401).send({ status: `error`, message: `El usuario ya existe` });
});

sessionsRouter.get(`/logout`, async (req, res) => {
  try {
    req.session.destroy((error) => {
      if (error) {
        return res.status(500).json({ error: `La sesión no se ha cerrado correctamente` });
      }
      res.json({ msg: `Sesión cerrada con éxito` });
    });
  } catch (error) {
    logger.error(error);
  }
});

sessionsRouter.get(`/github`, passport.authenticate(`github`, { scope: [`user:email`] }), async (req, res) => {});

sessionsRouter.get(
  `/githubcallback`,
  passport.authenticate(`github`, { failureRedirect: `/login` }),
  async (req, res) => {
    req.session.user = req.user;
    res.redirect(`/profile`);
  }
);

module.exports = sessionsRouter;
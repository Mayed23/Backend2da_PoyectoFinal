const { productService } = require("../service/service");

const isAuthorize = (req, res, next) => {
  if (req.user.role === "admin" || req.user.role === "premium") {
    next();
  } else {
    res.status(403).send({ error: "No tiene permisos para realizar esta acción" });
  }
};

const isOwnerAuthorized = async (req, res, next) => {
  const { id } = req.params;
  const product = await productService.getById(id);
  const user = req.session.user;
  if (product.owner._id === user._id || user.role === "admin") {
    next();
  } else {
    res.status(403).send({ error: "No tiene permisos para realizar esta acción" });
  }
};

const isLogin = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.status(403).send({ error: "Usuario no logueado" });
  }
};

const isUserAuthorized = (req, res, next) => {
  if (req.user.role === "user" || req.user.role === "premium") {
    next();
  } else {
    res.status(403).send({ error: "No tiene permisos para realizar esta acción" });
  }
};


module.exports = { isAuthorize, isOwnerAuthorized, isLogin, isUserAuthorized };
const { Router } = require(`express`);
const { 
  login,
  register,
  loginUser,
  vistaRegister,
  newRegister,
  perfilUser,
  logout,
  subirArch,
  changePassword,
  resetPassword,
  newSubirArch,
  messageVista,
  message,
  sendMessage,
  userAll,
  productsAll,
  productDetail,
  cartDetail,
   } = require("../controllers/views.controller.js");



const viewsRouter = Router()

viewsRouter.get(`/login`, login);
viewsRouter.get(`/register`, register);
viewsRouter.post(`/login`, loginUser);
viewsRouter.get(`/register`, vistaRegister);
viewsRouter.post(`/register`, newRegister);
viewsRouter.get(`/profile`, perfilUser);
viewsRouter.get(`/logout`, logout);
viewsRouter.get(`/subirarch`, subirArch);
viewsRouter.post(`/subirarch`, newSubirArch);
viewsRouter.get(`/changePassword`, changePassword) //vista
viewsRouter.post(`/changePassword`, resetPassword )
viewsRouter.get(`/messages`, messageVista);
viewsRouter.post(`/messages`, message);
viewsRouter.post(`/messages`, sendMessage);
viewsRouter.get(`/users`, userAll);
viewsRouter.get(`/products`, productsAll);
viewsRouter.get("/product/:id", productDetail );
viewsRouter.get(`/carts/:cid`, cartDetail);

//Pendientes

viewsRouter.get(`/ticket`, (req, res) => {
  res.render(`tickets`);
});

viewsRouter.post(`/ticket`, (req,res) =>{
  
})


viewsRouter.get(`/contacto`, (req, res) => {
  res.render(`contactos`);
});

module.exports = viewsRouter;

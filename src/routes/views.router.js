const { Router } = require(`express`);
const { 
  login,
  register,
  loginUser,
  vistaRegister,
  newRegister,
  perfilUser,
  logoutUser,
  subirArch,
  viewsChangePassword,
  newSubirArch,
  messageVista,
  message,
  sendMessage,
  userAll,
  productsAll,
  productDetail,
  cartDetail,
  cartVista,
  changePassword,
  viewResetPassword,
  resetPassword,
  vistaInicio,
  userDelete,
  userEdit,
  //addToCart
  
  
   } = require("../controllers/views.controller.js");



const viewsRouter = Router()

viewsRouter.get(`/login`, login);
viewsRouter.get(`/register`, register);
viewsRouter.post(`/login`, loginUser);
viewsRouter.get(`/register`, vistaRegister);
viewsRouter.post(`/register`, newRegister);
viewsRouter.get(`/profile`, perfilUser);
viewsRouter.get(`/logout`, logoutUser);
viewsRouter.get(`/subirarch`, subirArch);
viewsRouter.post(`/subirarch`, newSubirArch);
viewsRouter.get(`/resetPassword`, viewResetPassword)
viewsRouter.post(`/resetPassword`, resetPassword);
viewsRouter.get("/changePassword/:token", viewsChangePassword);
viewsRouter.post("/changePassword", changePassword);
viewsRouter.get(`/messages`, messageVista);
viewsRouter.post(`/messages`, message); 
viewsRouter.post(`/messages`, sendMessage);
viewsRouter.get('/users', userAll);
viewsRouter.get('/users/edit/:id', userEdit);
viewsRouter.get('/users/delete/:id', userDelete);
viewsRouter.get(`/products`, productsAll);
viewsRouter.get(`/product/:pid`, productDetail);
//viewsRouter.get(`/carts/:cid/product/:pid`, addToCart)
viewsRouter.get(`/carts/:cid`, cartDetail, cartVista);
viewsRouter.get(`/`, vistaInicio)



//viewsRouter.get(`/carts`, cartVista)


//Pendientes


// //Socket View
// viewsRouter.use("./realtimeproducts", (req, res)=>{
//   res.status(200), render(`realTimeProduct`)
// })

// // //Handelbars View
// viewsRouter.get("/", (req, res)=>{
//   res.status(200), render(`home`)
// })



viewsRouter.get(`/ticket`, (req, res) => {
  res.render(`tickets`);
});

viewsRouter.post(`/ticket`, (req,res) =>{
  
})


viewsRouter.get(`/contacto`, (req, res) => {
  res.render(`contactos`);
});

module.exports = viewsRouter;

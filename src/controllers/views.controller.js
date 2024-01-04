
const { uploader } = require("../utils/multer");
const { passportCall } = require("../middleware/passportCall.meddlewars");
const { authorization } = require("../middleware/authorization");
const { createHash, isValidPass } = require("../utils/hash");
const { generateToken, verifyToken } = require("../utils/jsonwebtoken");
const { 
    userService, 
    messgeService, 
    cartService, 
    productService, 
    ticketService 
} = require("../service/service.js");
const { logger } = require("../utils/loggers");
const sendlinkEmail = require("../utils/sendEmail");
const passport = require("passport");





const vistaInicio = async(req, res) => {
  res.render(`products`)
}

const login = async (req, res) => {
    res.render(`login`, {
      showNav: true,
    });
}

const register = async (req, res) => {
    res.render(`register`, {
      showNav: true,
    });
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    const user = await userService.getByEmail(email);
  
    //console.log(user.password, typeof (password))
  
    if (!user)
      return res
        .status(401)
        .send({ status: `error`, error: `El Usuario no existe` });
  
    if (!isValidPass(password, user)) {
      return res
        .status(401)
        .send({ status: `error`, error: `Datos incorrectos` });
    }
    const token = generateToken({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email, 
      age: user.age, 
      role: user.role,
    });
     const destiny = (user.role == `admin`)? `/users` : `/products`
    res
      .cookie(`cookieToken`, token, {
        maxAge: 60 * 60 * 10000,
        httpOnly: true,
      })
      .redirect(destiny);
  
    // .status(200).send({
    //     status: `success`,
    //     token: token,
    //     message: `loggen successfully`})
     
}

const vistaRegister = async (req, res) => {
    try {
      res.render(`register`);
    } catch (error) {
      logger.error(error);
    }checkToken
}

const newRegister = async (req, res) => {
    const { first_name, last_name, age, email, password, role } = req.body;
    try {
      const user = await userService.getByEmail(email);
      logger.info(user);
      if (user) {
        return res.render(`register`, { error: `el ${email} ya existe` });
      }
      if (!first_name || !last_name || !age || !email || !password || !role) {
        return res.render(`register`, { error: `Ingrese todos los datos` });
      }
      const newUser = await userService.create({
        first_name,
        last_name,
        age,
        email,
        password: createHash(password),
        role,
      });
      logger.info(newUser);
      res.redirect(`/login`);
    } catch (error) {
      logger.error(error);
    }
}

const perfilUser = async (req, res) => {
  try {
    const token = req.cookies.cookieToken; // Obtener el token de la cookie llamada 'cookieToken'
    
    const user = verifyToken(token); // Verificar el token
    
    if (!user) return res.redirect(`/login`);
    
    res.render(`profile`, { user });
  } catch (error) {
    logger.error(error);
  }
}

// const perfilUser = async (req, res) => {
//     try {
//       const user = verifyToken({req.cookies.token})

//       console.log(user, `pppppp`)
//       if (!user) return res.redirect(`/login`);
//       res.render(`profile`, {user: req.user});
//     } catch (error) {
//       logger.error(error);
//     }
// }

const logoutUser = async (req, res) => { 
    req.session.destroy((error) => {
      if (error) {
        return res.json({
          status: `Cesion no se ha cerrado correctamente`,
          body: message,
        });
      }
      res.redirect(`/login`);
    });
}

const subirArch = async (req, res) => {
    res.render(`subirArch`);
}

const newSubirArch = (uploader.single(`file`), (req, res) => {
    if (!req.file)
      return res
        .status(400)
        .send({ status: `error`, error: `No se pudo guardar la Imagen` });
  
    res.send({ status: `success`, payload: `Archivo subido con Éxito` });
  })

  const viewResetPassword = async (req, res) => {
    try {
      res.render("resetPassword");
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ error: "Server internal error" });
    }
  };
  
  const resetPassword = async (req, res) => {
    const { email } = req.body;
    try {
      const user = await userService.getByEmail(email);
  
      if (!user) return res.render("resetPassword", { error: `El usuario con el mail ${email} no existe` });
  
      // Generamos nuevo token que expira en 1hs
      const token = generateToken({ email }, "1h");
  
      // Enviamos el mail con el link para resetear la contraseña
      sendlinkEmail(token, email);
  
      res.render("mailConfirm", { email });
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ error: "Server internal error" });
    }
  };

const viewsChangePassword = async (req, res) =>{
    try{
      res.render(`changePassword`)
    }catch(error){
      logger.error(error)
    }
}

const changePassword = async (req, res) => {
    const { email, password1, password2 } = req.body
      try{

        if (password1 !== password2 ) 
        return res.render(`changePassword`, { error: "Las contraseñas no coinciden"})

        const user = await userService.getByEmail(email)
          if(!user) 
          return res.render(`changePassword`, { error : `El usuario ${email} no existe`})
        
  
        await userService.UpdatePassword(email,createHash(password1))
        res.render("changePasswordConfirm", { msg: "Contraseña cambiada con éxito" });

        logger.info(user)
        res.redirect(`/login`)
      }catch(error){
        logger.error(error)
      }
}

const messageVista = (req, res) => {
    res.render(`message`);
}

const message = async (req, res) => {
    const newMessage = req.body;
  
    await msg.createMessage(newMessage);
    logger.info(message);
}

const sendMessage = (uploader.single(`file`), (req, res) => {
    if (!req.file)
      return res
        .status(400)
        .send({ status: `error`, error: `No se pudo enviar el mensaje` });
    res.send({ status: `success`, payload: `mensaje enviado` });
})

const userAll = ([passportCall(`jwt`), authorization(`admin`)],
async (req, res) => {
  const { limit, page, query } = req.query;
  try {
    const options = {
      limit: limit || 10,
      page: page || 2,
      lean: true,
    };
    const users = await userService.get({}, options);
    const { totalPages, docs, hasPrevPage, hasNextPage, prevPage, nextPage } =
      {};

    const userList = users.map((u) => {
      return {
        first_name: u.first_name,
        last_name: u.last_name,
        email: u.email,
      };
    });

    res.status(200).render("users", {
      showNav: true,
      users: userList,
      totalPages,
      prevPage,
      nextPage,
      page: 1,
      hasPrevPage,
      hasNextPage,
    });
  } catch (error) {
    logger.error(error);
  }
})


const productsAll = async (req, res) => {
    const { limit, page, sort, category, status } = req.query;
    try {
      const options = {
        limit: limit || 10,
        page: page || 1,
        sort: { price: sort === "asc" ? 1 : -1 },
        lean: true,
      };
      if (status != undefined) {
        const products = await productService.get({ status: status }, options);
        res.status(200).json(products);
      }
      if (category != undefined) {
        const products = await productService.get(
          { category: category },
          options
        );
        res.status(200).json(products);
      }
  
      const products = await productService.get({}, options);
      logger.info(products);
      const { totalPages, docs, hasPrevPage, hasNextPage, prevPage, nextPage } =
        products;
      res.render("products", {
        status: "success",
        products: docs,
        totalPages,
        prevPage,
        nextPage,
        page: products.page,
        hasPrevPage,
        hasNextPage,
      });
    } catch (error) {
      logger.error(error);
    }
}

const productDetail = async (req, res, ) => {
    const prodId = req.params.pid;
    const token = req.cookies.cookieToken
    const dataToken = verifyToken(token)
    const email = dataToken.email
    console.log(dataToken.user.email)
    try{
      let product = await productService.getById(prodId);
      
      const user = await userService.getByEmail(email)
     
      let cart = await cartService.getByUser(user._id.toString())
      
      
      product.cartId = cart._id.toString()    
      res.render("itemDetail", product); 
    } catch (error) {
      logger.error(error);
    }
}

const cartDetail = async (req, res) => {
    const {cid} = req.params
    try {
      const cart = await cartService.getById(cid);
      logger.info(cart)
      if (!cart) return res.status(404).json({ msg: "Carrito no Existe" });
      const productList = cart.products.map(p =>{
        return { 
        title: p.product.title,
        description: p.product.description,
        price: p.product.price,
        quantity: p.quantity
        }
      })
      logger.info(productList)
      res.render("carts",  {productList}).redirect(`/carts`);
      
    } catch (error) {
      logger.error(error);
    }
  }

  const cartVista = (req, res) => {
    res.render(`/carts/:cid`);
}


module.exports = { 
    login, 
    register, 
    loginUser,
    vistaRegister,
    newRegister, 
    perfilUser, 
    logoutUser, 
    subirArch, 
    newSubirArch,
    viewResetPassword,
    resetPassword,
    viewsChangePassword, 
    changePassword, 
    messageVista,
    message, 
    sendMessage, 
    userAll, 
    productsAll, 
    productDetail, 
    cartDetail,
    cartVista,
    vistaInicio
    }
const { Router } = require(`express`)
const { uploader } = require(`../utils/multer.js`)
const { messageManagerMongo } = require(`../Dao/Mongo/messageManager.js`)
const productManagerModel = require (`../Dao/Mongo/productsManager.js`)
const cartsManagerMongo = require("../Dao/Mongo/cartsManager.js")
const { userManagerMongo } = require("../Dao/Mongo/userManager.js")
const { userModel } = require("../Dao/Mongo/models/user.model.js")
const { passportCall } = require("../middleware/passportCall.meddlewars.js")
const { authorization } = require("../middleware/authorization.js")
const { createHash, isValidPass } = require("../utils/hash.js")
const { generateToken, verifyToken } = require("../utils/jsonwebtoken.js")






const viewsRouter = Router()
const prod =  new productManagerModel()
const servCart = new cartsManagerMongo()
const msg = new messageManagerMongo()
const userReg = new userManagerMongo()



viewsRouter.get(`/login`, async (req, res) =>{
    res.render(`login`, {
        showNav: true
    })
})


viewsRouter.get(`/register`, async (req, res) =>{
    res.render(`register`, {
        showNav: true
    })
})
viewsRouter.post(`/login`, async (req, res)=>{
    const { email, password } = req.body
    //console.log(req.body)
    const user = await userReg.getUsersByEmail(email)
    //console.log(user)
    if(!user) return res.status(401).send({status: `error`, error: `El Usuario no existe`})
    
    if(!isValidPass(password, user)){
        return res.status(401).send({status: `error`, error: `Datos incorrectos`})
    }
    const token = generateToken({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role
    })

    res.cookie(`cookieToken`, token, {
        maxAge: 60*60*10000,
        httpOnly: true
    }).status(200).send({
        status: `success`,
        token: token,
        message: `loggen successfully`
    })
    
})



viewsRouter.get(`/register`, async (req, res) =>{ 
    try {
      res.render(`register`);
    } catch (error) {
        console.log(error);
    }
});

viewsRouter.post(`/register`, async (req, res) => {
    const {first_name, last_name, age, email, password, role} = req.body
    try{
        const user = await userReg.getUsersByEmail(email)
        console.log(user)
        if(user){
            return res.render(`register`, {error: `el ${email} ya existe`})
        }
        if(!first_name || !last_name || !age || !email || !password || !role){
            return res.render(`register`, {error: `Ingrese todos los datos`})
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
        }
})
      


viewsRouter.get(`/profile`, async (req, res) =>{

    try{
        const user  = verifyToken(req.cookies)
           
        if(!user) return res.redirect(`/login`)
        res.render(`profile`,  user )
    }catch(error){
        console.log(error)
    }
})

viewsRouter.get(`/logout`, async (req, res) =>{
    req.session.destroy((error) => {
        if(error){
            return res.json({status: `Cesion no se ha cerrado correctamente`, body: message })
        }
        res.redirect(`/login`)
    })
    
})

viewsRouter.get(`/subirarch`, (req, res) => {
    res.render(`subirArch`)
})  

viewsRouter.post(`/subirarch`, uploader.single(`file`), (req, res) =>{
    if(!req.file) return res.status(400).send({status: `error`, error: `No se pudo guardar la Imagen`})

    res.send({status: `success`, payload: `Archivo subido con Éxito`})

})

viewsRouter.get(`/messages`, (req, res) => {
    res.render(`message`)
})

viewsRouter.post(`/messages`, async (req, res)=>{
    const newMessage = req.body

    await msg.createMessage(newMessage)
    console.log (message)
})
viewsRouter.post(`/messages`, uploader.single(`file`), (req, res) =>{
    if(!req.file) return res.status(400).send({status: `error`, error: `No se pudo enviar el mensaje`})
    res.send({status: `success`, payload: `mensaje enviado`})


})
viewsRouter.get(`/users`, [
        passportCall(`jwt`),
        authorization([`USER`,`ADMIN`])
    ], async (req, res) => {
        const {limit, page, query } = req.query
        try{
            const options = { 
                limit: limit || 5, 
                page: page || 1, 
                lean: true
            }
            const users = await userModel.paginate({}, options)
            //console.log(users)
            const{totalPages, docs, hasPrevPage, hasNextPage, prevPage, nextPage} = users
            res.status(200).render("users",{
                showNav: true, 
                users: docs,
                totalPages,
                prevPage,
                nextPage,
                page: users.page,
                hasPrevPage,
                hasNextPage
            
        })
        }catch (error) {
            console.log(error)
        }
})    

viewsRouter.get(`/products`, async (req, res) => {
    const {limit, page, sort, category, status} = req.query
    try{
        const options = { 
            limit: limit || 10, 
            page: page || 1, 
            sort: { price: sort === "asc" ? 1 : -1,}, 
            lean: true
        }
        if (status != undefined) {
            const products = await prod.getProducts({status: status}, options)
            res.status(200). json(products)
        }
        if (category != undefined) {
            const products = await prod.getProducts({category: category}, options)
            res.status(200). json(products)
        } 

        const products = await prod.getProducts({}, options)
        console.log(products)
        const{totalPages, docs, hasPrevPage, hasNextPage, prevPage, nextPage} = products
        res.render("products",{
            status: "success", 
            products: docs,
            totalPages,
            prevPage,
            nextPage,
            page: products.page,
            hasPrevPage,
            hasNextPage
        
       })
    }catch (error) {
        console.log(error)
    }
})    

viewsRouter.get("/product/:id", async (req, res) => {
    const prodId = req.params.id
    try{
        const product = await prod.getProductById(prodId)
        console.log(prodId)
        res.render("itemDetail", product)
    }catch(error){
        console.log(error)
    }
})

viewsRouter.get(`/carts/:cid`, async (req, res) =>{
    const cid = req.params
      try{
        const cart = await servCart.addProductToCart(cid)
        if(!cart) 
            return res.status(404).json({msg: "Carrito no Existe"})
            res.render("carts", { prodId: cart.products})
    }catch(error){
        console.log(error)
    }
})    

viewsRouter.get(`/contacto`, (req, res)=>{
    res.render(`contactos`)
})


module.exports = viewsRouter
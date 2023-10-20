const { Router } = require(`express`)
const { uploader } = require(`../utils/multer.js`)
//const messageManagerMongo = require(`../views/message.js`)
const product = require(`../Dao/Mongo/models/products.model.js`)
const productManagerModel = require (`../Dao/Mongo/productsManager.js`)
const cartsManagerMongo = require("../Dao/Mongo/cartsManager.js")




const viewsRouter = Router()



viewsRouter.get(`/login`, async (req, res) =>{
    res.render(`login`)
})

viewsRouter.get(`/register`, async (req, res) =>{ 
    res.render(`register`)
})

viewsRouter.get(`/profile`, async (req, res) =>{

    res.render(`profile`, {
        first_name: req.session.nameUser,
        last_name: req.session.lastNaUser,
        email: req.session.emailUser,
        role: req.session.roleUsers
    })

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

viewsRouter.post(`/messages`, uploader.single(`file`), (req, res) =>{
    if(!req.file) return res.status(400).send({status: `error`, error: `No se pudo enviar el mensaje`})
    res.send({status: `success`, payload: `mensaje enviado`})


})

viewsRouter.get(`/product`, async (req, res) => {

    const { limit, numPage, sort, category} =req.params
    let servProds = new productManagerModel()
    const {
        docs,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        page,
        totalPage
    } = await servProds.getProducts({limit, numPage, sort: {price: sort}, category, lean: true})
    // console.log(docs)
    // console.log(hasPrevPage)
    // console.log(hasNextPage)
    // console.log(prevPage)
    // console.log(nextPage)
    res.status(200).render(`products`, {
        
        products: docs,       
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        page,
        totalPage
    })
})    

viewsRouter.get(`/carts`,(req, res) =>{
    let servCart = new cartsManagerMongo()
    console.log (servCart)
        res.status(200).render(`carts`)
})


  







viewsRouter.get(`/contacto`, (req, res)=>{
    res.render(`contactos`)
})


module.exports = viewsRouter
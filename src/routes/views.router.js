const { Router } = require(`express`)
const { uploader } = require(`../utils/multer.js`)
//const messageManagerMongo = require(`../views/message.js`)
const product = require(`../Dao/Mongo/models/products.model.js`)
const productManagerModel = require (`../Dao/Mongo/productsManager.js`)
const cartsManagerMongo = require("../Dao/Mongo/cartsManager.js")

 
const router = Router()

router.get(`/subirarch`, (req, res) => {
    res.render(`subirArch`)
})  

router.post(`/subirarch`, uploader.single(`file`), (req, res) =>{
    if(!req.file) return res.status(400).send({status: `error`, error: `No se pudo guardar la Imagen`})

    res.send({status: `success`, payload: `Archivo subido con Éxito`})

 })

 router.get(`/messages`, (req, res) => {
    res.render(`message`)
 })

 router.post(`/messages`, uploader.single(`file`), (req, res) =>{
    if(!req.file) return res.status(400).send({status: `error`, error: `No se pudo enviar el mensaje`})
    res.send({status: `success`, payload: `mensaje enviado`})


})



router.get( `/product`,  async (req, res)=>{
    try{
    const { numPage=1 } = req.query 
        let {
            docs,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
            page,
            totalPage
        } = await product.paginate({}, {limit: 10, numPage})
    // if (){ pendiente realizar validaciones

    // }
    // console.log(product)
        res.render('products', {
            users: docs,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
            page,
            totalPage
        }) 
    }catch (error){
     console.log(error)
        }
})


module.exports = router
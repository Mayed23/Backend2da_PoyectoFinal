const { Router } = require(`express`)
const productManagerMongo = require('../Dao/Mongo/productsManager.js')


const routerProducts = Router()
const product = new productManagerMongo()

routerProducts.get("/", async (req, res) =>{
    try{
        const products = await product.getProducts()
        res.status(200). json(products)
    } catch(error){
        console.log(error)
    }
  
})

routerProducts.get("/:_id",  async (req, res) =>{
    let _id = req.params._id
    try{
        const product = await product.getProductById(_id)

        res.status(200).json(product)
    }catch(error){
        console.log(error)
    }
})
 

routerProducts.post("/", async (req, res) => {
    let newProduct = req.body
    try{
        const addProduct = await product.addProducts(newProduct)
        res.status(200).json(addProduct)
    }catch(error){
        console.log(error)
    }
})   

routerProducts.put("/:_id", async (req, res) =>{
    let id = req.params.id
    let updateProd = req.body
    try{
        await prd.updateProduct(id, updateProd)
        const product = await product.getProductById(id)
        res.status(200).json({
           msg: `Producto Actualizado`, product
        })
    }catch(error){
        console.log(error)
    }
}) 

routerProducts.delete("/:_id", async (req, res) =>{
    let id = req.params.id
    try{
        await prd.deleteProduct(_id)
        res.status(200).json({
            msg: `Producto Eliminado con Exito`})
    } catch(error){
        console.log(error)
    }
    
})

module.exports = routerProducts
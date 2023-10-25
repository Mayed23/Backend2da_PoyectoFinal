const { Router } = require(`express`)
const productManagerMongo = require('../Dao/Mongo/productsManager.js')


const routerProducts = Router()
const product = new productManagerMongo()

routerProducts.get("/", async (req, res) =>{
    const {limit, page, sort, category, status} = req.query
    try{
        const options = { 
            limit: limit || 10, 
            page: page || 1, 
            sort: { price: sort === "asc" ? 1 : -1,}, 
            lean: true
        }
        if (status != undefined) {
            const products = await product.getProducts({status: status}, options)
            res.status(200). json(products)
        }
        if (category != undefined) {
            const products = await product.getProducts({category: category}, options)
            res.status(200). json(products)
        } 

        const products = await product.getProducts({}, options)
        console.log(products)
        const{totalPages, docs, hasPrevPage, hasNextPage, prevPage, nextPage} = products
        res.status(200).json({
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


routerProducts.get("/:id",  async (req, res) =>{
    res.send(await product.getProductById(req.params.id))
})

routerProducts.get("/:limit",  async (req, res) =>{
    res.send(await product.getProductsLimit(req.query.limit))
})

routerProducts.post("/", async (req, res) => {
    let newProduct = req.body
    try{
        const prodNew = await product.addProducts(newProduct)
        res.status(200).json(prodNew)
    }catch(error){
        console.log(error)
    }
})   

routerProducts.put("/:id", async (req, res) =>{
    let id = req.params.id
    let updateProd = req.body
    try{
        await product.updateProductsById(id, updateProd)
        const prodOne = await product.getProductById(id)
        res.status(200).json({
           msg: `Producto Actualizado`, prodOne
        })
    }catch(error){
        return `Cambios no realizados`
        // console.log(error)
    }
})

routerProducts.delete("/:id", async (req, res) =>{
    let id = req.params.id
    try{
        await product.deleteProducts(id)
        res.status(200).json({
            msg: `Producto Eliminado con Exito`})
    } catch(error){
        console.log(error)
    }
    
})


module.exports = routerProducts
const { Router } = require(`express`)
const ProductsController = require("../../controllers/products.controller")



const routerProducts = Router()
const {
    getProducts,
    getProductById,
    createProducts,
    updateProduct,
    deleteProduct
} = new ProductsController

routerProducts.get("/", getProducts)       
routerProducts.get("/:id", getProductById)
routerProducts.post("/", createProducts)   
routerProducts.put("/:id", updateProduct)
routerProducts.delete("/:id", deleteProduct)


module.exports = routerProducts
const { Router } = require(`express`)
const ProductsController = require("../../controllers/products.controller")



const routerProducts = Router()
const {
    getProducts,
    getProductById,
    getProductsLimit,
    createProducts,
    updateProduct,
    deleteProduct    
} = new ProductsController

routerProducts.get("/", getProducts)       
routerProducts.get("/:id", getProductById)
routerProducts.get("/limit/:limit", getProductsLimit)
routerProducts.post("/", createProducts)   
routerProducts.put("/:id", updateProduct)
routerProducts.delete("/:id", deleteProduct)


module.exports = routerProducts
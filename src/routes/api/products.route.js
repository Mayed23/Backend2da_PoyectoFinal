const { Router } = require(`express`)
const ProductsController = require("../../controllers/products.controller.js")
const checkUser = require("../../middleware/checkUser.js")


const routerProducts = Router()
const {
    getProducts,
    getProductById,
    createProducts,
    updateProduct,
    deleteProduct,
    getMonckingProducts
} = new ProductsController

routerProducts.get("/", getProducts)       
routerProducts.get("/:id", getProductById)
routerProducts.post("/", checkUser.isLogin, checkUser.isAuthorize, createProducts)   
routerProducts.put("/:id", checkUser.isLogin, checkUser.isAuthorize, updateProduct)
routerProducts.delete("/:id", checkUser.isLogin, checkUser.isOwnerAuthorized, deleteProduct)
routerProducts.post("/monkingproducts", getMonckingProducts)

module.exports = routerProducts
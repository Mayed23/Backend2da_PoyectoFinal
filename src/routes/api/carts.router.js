const { Router } = require(`express`)
const CartsController = require("../../controllers/carts.controller.js")
 

const CartsRouter = Router()
const {
    createCarts,
    getCarts,
    getCartsById,
    deleteCarts,
    createProductToCarts,
    createProductInUserCart,
    deleteProdCarts,
    purchaseCart
    } = new CartsController


CartsRouter.post("/",createCarts)
CartsRouter.get("/", getCarts)
CartsRouter.get("/:id", getCartsById)
CartsRouter.delete("/:id", deleteCarts )
CartsRouter.post("/:cid/product/:pid", createProductToCarts)
CartsRouter.post("/product/:pid", createProductInUserCart)
CartsRouter.delete("/:cid/product/:pid", deleteProdCarts)
CartsRouter.post("/:cid/purchase", purchaseCart)



module.exports = CartsRouter
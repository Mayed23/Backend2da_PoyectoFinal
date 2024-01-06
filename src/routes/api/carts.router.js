const { Router } = require(`express`)
const CartsController = require("../../controllers/carts.controller.js")
const checkMongoId = require("../../middleware/CheckMongol.js")
 

const CartsRouter = Router()
const {
    createCarts,
    getCarts,
    getCartsById,
    getCartByUsers,
    deleteCarts,
    createProductToCarts,
    createProductInUserCart,
    deleteProdCarts,
    purchaseCart
    } = new CartsController


CartsRouter.post("/",createCarts)
CartsRouter.get("/", getCarts)
CartsRouter.get("/:id", getCartsById)
CartsRouter.get("/user/:uid", getCartByUsers)
CartsRouter.delete("/:id", deleteCarts )
CartsRouter.post("/product/:pid", createProductToCarts)
CartsRouter.post("/:cid/product/:pid", createProductToCarts)
CartsRouter.post("/product/:pid", checkMongoId, createProductInUserCart)
CartsRouter.delete("/:cid/product/:pid", deleteProdCarts)
CartsRouter.post("/:cid/purchase", purchaseCart)



module.exports = CartsRouter
const { Router } = require(`express`)
const CartsController = require("../../controllers/carts.controller")
 

const CartsRouter = Router()
const {
    createCarts,
    getCarts,
    getCartsById,
    deleteCarts,
    createProductToCarts,
    deleteProdCarts} = new CartsController


CartsRouter.post("/",createCarts)
CartsRouter.get("/", getCarts)
CartsRouter.get("/:id", getCartsById)
CartsRouter.delete("/:id", deleteCarts )
CartsRouter.post("/:cid/product/:pid", createProductToCarts)
CartsRouter.delete("/:cid/product/:pid", deleteProdCarts)



module.exports = CartsRouter
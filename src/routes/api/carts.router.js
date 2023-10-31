const { Router } = require(`express`)
const cartsManagerMongo  = require(`../../Dao/Mongo/cartsManager.js`)


const CartsRouter = Router()
const carts = new cartsManagerMongo()

CartsRouter.post("/", async (req, res) => {
    let cartNew = req, body
    res.send(await carts.addCarts(cartNew))

})

CartsRouter.get("/", async (req, res) => {
    res.send(await carts.getCarts())
})

CartsRouter.get("/:id", async (req, res) => {
    res.send(await carts.getCartsById(req.params.id))
})

CartsRouter.delete("/:id", async (req, res) => {
    res.send(await carts.deletCarts(req.params.id))
})

CartsRouter.post("/:cid/product/:pid", async (req, res) => {
    try {
        const carId = req.params.cid
        const prodId = req.params.pid
        const result = await carts.addProductToCart(carId, prodId)
        if(result.hasOwnProperty('error')) {
            throw new Error(result.error.msg)
        }
        res.json(result)        
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

CartsRouter.delete("/:cid/product/:pid", async (req, res) => {

    const carId = req.params.cid
    const prodId = req.params.pid
    res.send(await carts.deleteProdToCart(carId, prodId))

})



module.exports = CartsRouter
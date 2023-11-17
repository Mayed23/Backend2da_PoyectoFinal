const { Router } = require(`express`)
const userRouter = require(`./api/users.router.js`)
const productsRouter = require (`./api/products.route.js`)
const cartsRouter = require (`./api/carts.router.js`)
const viewsRouter = require(`./views.router.js`)
const cookiesRouter = require (`./api/cookie.router.js`)  
const sessionsRouter = require("./api/session.router.js")
const routerprueba = require("./api/pruebas.router.js")
const msgRouter = require("./api/messages.router.js")


const router = Router()


router.use(`/`, viewsRouter)
router.use(`/api/sessions`, sessionsRouter)
router.use(`/api/messages`, msgRouter)
router.use(`/api/users`, userRouter)
router.use(`/api/products`, productsRouter)
router.use(`/api/carts`, cartsRouter)
router.use(`/cookies`, cookiesRouter)
router.use(`/pruebas`, routerprueba )




module.exports = router
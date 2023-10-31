const { Router } = require(`express`)
const usersRouter = require(`./api/users.router.js`)
const productsRouter = require (`./api/products.route.js`)
const cartsRouter = require (`./api/carts.router.js`)
const viewsRouter = require(`./views.router.js`)
const cookiesRouter = require (`./api/cookie.router.js`)  
const sessionsRouter = require("./api/session.router.js")


const router = Router()


router.use(`/`, viewsRouter)
router.use(`/api/sessions`, sessionsRouter)
router.use(`/api/messages`, viewsRouter)
router.use(`/api/users`, usersRouter)
router.use(`/api/products`, productsRouter)
router.use(`/api/carts`, cartsRouter)
router.use(`/cookies`, cookiesRouter)




module.exports = router
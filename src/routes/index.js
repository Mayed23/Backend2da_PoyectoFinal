const { Router } = require(`express`)
const usersRouter = require(`./users.router.js`)
const productsRouter = require (`./products.route.js`)
const cartsRouter = require (`./carts.router.js`)
const viewsRouter = require(`./views.router.js`)
const cookiesRouter = require (`./cookie.router.js`)  
const sessionsRouter = require("./session.router.js")



const router = Router()



router.use(`/`, viewsRouter)
router.use(`/api/sessions`, sessionsRouter)
router.use(`/api/messages`, viewsRouter)
router.use(`/api/users`, usersRouter)
router.use(`/api/products`, productsRouter)
router.use(`/api/carts`, cartsRouter)
router.use(`/cookies`, cookiesRouter)




module.exports = router
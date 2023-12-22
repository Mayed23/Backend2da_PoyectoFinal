const { Router } = require (`express`)


const cookiesRouter = Router()

cookiesRouter.get(`/cookies`, (req, res) => {
    res.cookie(`coderCookies`, `información en la cookie`, {maxAge: 100000000}).send(`cookie seteada`)
})

//la cookie es un archivo de texto y "coderCookies" es la informació de la cookie, maxAge: tiempo de duración

cookiesRouter.get(`/getcookies`, (req, res) => {

    logger.info(req.cookies)
    res.send(`get cookies`)
})


//con firma para seguridad y evitar modificación de las cookies

cookiesRouter.get(`/signedcookies`, (req, res) => {
    res.cookie(`coderCookies`, `información en la cookie`, {maxAge: 100000000, signed: true}).send(`cookie firmada `)
})

cookiesRouter.get(`/session`, (req,res) => {
    if (req.session.counter){
        req.session.counter++
        res.send(`se ha visitado el sitio ${req.session.counter} veces.`)
    }else{
        req.session.counter = 1
        res.send(`<h1>Bienvenidos</h1>`)
    }
})

cookiesRouter.get(`/logout`, (req, res) => {
    req.session.destroy(err=>{
        // if(!err) res.send({status:'logout error', error: err}),
        res.send(`logout exitoso`)
    })
  
})



module.exports = cookiesRouter
const express = require (`express`)
const handlebars = require (`express-handlebars`)
const path = require (`path`)
const { server, Server } = require (`socket.io`)

const cookieParser = require (`cookie-parser`)
const session = require (`express-session`)
const FileStore = require (`session-file-store`)
const  MongoStore  = require (`connect-mongo`)

const { connectDb } = require(`./config/confi.js`)
const routerApp = require (`../src/routes`)
const { Socket } = require(`dgram`)
const passport = require (`passport`)
const  { initializePassport }  = require (`./config/passport.confi.js`)


const app = express()
const PORT = 8080

connectDb()

//Session con almacenamiento en Mongo
app.use(session({
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://AdminMaite:maite1503@cluster0.twm9xie.mongodb.net/ecommerce?retryWrites=true&w=majority`,
        mongoOptions: {
            // useNewUrlParse: true,
            useUnifiedTopology: true
            
        },        
        ttl: 15
    }),
    secret: `f1rm@un1k@`,
    resave: true,
    saveUninitialized: true
}))

//******MIDDLEWARES PASSPORT **********/

initializePassport()
app.use(passport.initialize())
//app.use(passport.session)


app.use(express.json())
app.use(express.urlencoded({extended: true}))

// app.use(`/`, (req, res)=>{
//     res.send(`hola`)
// })

//******MIDDLEWARES **********/
//configuracion handlebars
app.engine(`hbs`, handlebars.engine({
    extname: `.hbs`
}))

app.set(`view engine`, `hbs`)
app.set(`views`, __dirname + `/views`)

app.use(`/`,express.static(path.join(__dirname, '/public')));

//cookies

//app.use(cookieParser(`f1rm@un1k@`))

//********************SESSION 
//  //con fileStore se crea carpeta automatica en el servidor donde se almacena cada inicio.
// const fileStore = FileStore(session)

// app.use(session({
//     store: new fileStore({
//         path: __dirname+`sessions`,
//         ttl: 1000,
//         retries: 0
//     }), 
//     secret: `f1rm@un1k@`,
//     resave: true,
//     saveUninitialized: true
// })) 

// app.post(`/login`, (req, res) =>{
//     const { email , password} = req.body
//     if ( email !0)
// })



app.use(routerApp)

//Configuración  del Socket

// app.listen(PORT, () => {
//     console.log(`Server listen on port ${PORT}`)
// })

const httpServer = app.listen(PORT, () => {
    console.log(`Server listen on port ${PORT}`)
})
const socketServer = new Server(httpServer)
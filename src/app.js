const express = require (`express`)
const { Server } = require (`socket.io`)
const handlebars = require (`express-handlebars`)
const cookieParser = require (`cookie-parser`)
const path = require (`path`)
const session = require (`express-session`)
const passport = require(`passport`)

const { Socket } = require("dgram")
const FileStore = require (`session-file-store`)
const  MongoStore  = require (`connect-mongo`)



const routerApp = require (`../src/routes/`)
const { initializePassport } = require (`../src/config/passportJwt.js`)
const {  configObject: {  port, connectDb, cookiekey }}= require("./config/confi.js")



const app = express()
const PORT = port || 8080


connectDb()

//Session con almacenamiento en Mongo
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        mongoOptions: {
            //useNewUrlParse: true,
            useUnifiedTopology: true
            
        },        
        ttl: 15
    }),
    secret: process.env.SECRET_SESSIONS,
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

app.use(cookieParser(cookiekey))

//********************SESSION 
 //con fileStore se crea carpeta automatica en el servidor donde se almacena cada inicio.
// const fileStore = FileStore(session)

// app.use(session({
//     store: new fileStore({
//         path: __dirname+`sessions`,
//         ttl: 1000,
//         retries: 0
//     }), 
//     secret: process.env.SECRET_SESSIONS,
//     resave: true,
//     saveUninitialized: true
// })) 


app.use(routerApp)


const httpServer = app.listen(PORT, () => {
    console.log(`Server listen on port ${PORT}`)
})
const socketServer = new Server(httpServer)
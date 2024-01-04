const express = require (`express`)
const { Server } = require (`socket.io`)
const handlebars = require (`express-handlebars`)
const cookieParser = require (`cookie-parser`)
const path = require (`path`)
const session = require (`express-session`)
const passport = require(`passport`)
const swaggerJSDoc = require("swagger-jsdoc")
const swaggerUiExpress = require("swagger-ui-express")

const { Socket } = require("dgram")
const FileStore = require (`session-file-store`)
const  MongoStore  = require (`connect-mongo`)



const routerApp = require (`../src/routes/`)
const { initializePassport } = require (`../src/config/passportJwt.js`)
const {  configObject: {  port, connectDb, cookiekey }}= require("./config/confi.js")
const errorHandleMidd = require("./middleware/error/indexError.js")
const { addlogger, logger } = require("./utils/loggers.js")
const { productService, messgeService } = require("./service/service.js")



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

//Configuración de Swagger

const swaggerOptions = {
    definition: {
      openapi: `3.0.1`,
      info: {
        title: `Documentación de la API`,
        description: `Documentación de la API, aplicado a Productos y Carrito de compra`,
      },
    },
    apis: [`./docs/**/*.yaml`],
  };
  
const specs = swaggerJSDoc(swaggerOptions);

app.use(`/docs`, swaggerUiExpress.serve, swaggerUiExpress.setup(specs));



app.use(addlogger)
app.use(routerApp)

//app.use(errorHandleMidd)



const httpServer = app.listen(PORT, () => {
    logger.info(`Server listen on port ${PORT}`)
    
})
const socketServer = new Server(httpServer)

    socketServer.on(`connection`, async (socket) => {
    logger.info(`Clirnte Conectado`);

const products = productService.get();

    socket.emit(`products`, products.docs); 

const messages = await messgeService.getByMessages()
    
    socket.emit(`messages`, messages)

    socket.on(`new-Product`, async (data) => {
        await productService.create(data);
        const products = await productService.get()
        socketServer.emit(`products`, products.docs)
    })

    socket.on(`delete`, async (id) => {
        await productService.delete(id);
        const products = await productService.get()
        socketServer.emit(`products`, products.docs)
    })

    socket.on(`chatMessage`, async (data) => {
        await messgeService.addMessages(data)
        const messages = await messgeService.getMessages()
        socket.emit(`messages`, messages)

    })


})
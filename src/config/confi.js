const dotenv = require (`dotenv`)
const { program } = require("../utils/commander")
const MongoSingleton = require("../utils/MongoSingleton")
//const { connect } = require("mongoose")

const { mode } = program.opts()



dotenv.config({
    path: mode === `development` ? `./.env.development` : `./.env.production`
})


const configObject = {

    port:                process.env.PORT,
    mongo_url:           process.env.MONGO_URL,
    privateKey:          process.env.PRIVATE_KEY,
    cookieKey:           process.env.SECRET_SESSIONS,
    clientId:            process.env.CLIENT_ID,
    clientSecret:        process.env.CLIENT_SECRET,
    callbackURL:         process.env.CALLBACK_URL,
    persistence:         process.env.PERSISTENCE,
    nodemailer_password: process.env.NODMAILER_PASSWORD,
    nodemailer_user:     process.env.NODEMAILER_USER,
    connectDb: async () => await MongoSingleton.getInstance(process.env.MONGO_URL)

    
}


// const connectDb = async () => {
//     try {
//         logger.info(`Base de Datos conectada`)
//         return await connect(process.env.MONGO_URL)

//     } catch (error) {
//         logger.error(error)
//     }

// }






module.exports = { configObject }
const { connect } = require (`mongoose`)
const dotenv = require (`dotenv`)
const { program } = require("../utils/commander")

const { mode } = program.opts()

console.log(mode)

dotenv.config({
    path: mode === `development` ? `./.env.development` : `./.env.production`
})


const configObject = {
    port: process.env.PORT,
    mongo_url: process.env.MONGO_URL,
    privateKey: process.env.PRIVATE_KEY,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL

    
}


const connectDb = async () => {
    try {
        console.log(`Base de Datos conectada`)
        return await connect(process.env.MONGO_URL)

    } catch (error) {
        console.log(error)
    }

}






module.exports = { connectDb, configObject }
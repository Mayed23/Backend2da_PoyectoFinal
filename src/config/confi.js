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
    mongo_url: process.env.MONGO_URL
    
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
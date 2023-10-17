const { connect } = require (`mongoose`)
// const { productModel } = require("../Daos/Mongo/models/product.model")
// const { cartModel } = require("../Daos/Mongo/models/carts.model")


const connectDb = async () => {
    try {
        console.log(`Base de Datos conectada`)
        return await connect("mongodb+srv://AdminMaite:maite1503@cluster0.twm9xie.mongodb.net/ecommerce?retryWrites=true&w=majority")

    } catch (error) {
        console.log(error)
    }

}




module.exports = { connectDb }
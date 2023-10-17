const { Schema, model } = require (`mongoose`)
const mongoosePaginate = require (`mongoose-paginate-v2`)



const prodCollection =  `products`

const productSchema = new Schema({
    name: {
        type: String,
        max: 30,
        required: true
    },
    model: {
        type: String,
        max: 30,
        requird: true
    },
    code: {
        type: String,
        required: true
    },
    price: {
        type: Number
    },
    stock: {
        type: Number
    },
    category: {
        type: String
    },
    img: {
        type: String
    }
})
productSchema.plugin(mongoosePaginate)
const product = model(prodCollection, productSchema)

module.exports = product
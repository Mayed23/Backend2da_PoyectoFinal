const { Schema, model } = require (`mongoose`)
const mongoosePaginate = require (`mongoose-paginate-v2`)



const prodCollection =  `products`

const productSchema = new Schema({
    title: {
        type: String,
        max: 30,
        required: true
    },
    price: {
        type: Number
    },
    description: {
        type: String,
        max: 30,
        requird: true
    },
    thumbnail: {
        type: String
    },
    
    status : Boolean,
    
    stock: {
        type: Number
    },
    code: {
        type: String,
        required: true
    },   
    category: {
        type: String
    }
    
})
productSchema.plugin(mongoosePaginate)
const product = model(prodCollection, productSchema)

module.exports = product
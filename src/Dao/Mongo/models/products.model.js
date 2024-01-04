const { Schema, model } = require (`mongoose`)
const mongoosePaginate = require (`mongoose-paginate-v2`)



const prodCollection =  `products`

const productSchema = new Schema({

    title: {
        type: String,
        Required: true
    
    },
    price: {
        type: Number
    },
    description: {
        type: String,
        Required: true
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
        Required: true
    },   
    category: {
        type: String
    },
    owner: {
        type: String,
        default: 'admin'
    }
    
})
productSchema.plugin(mongoosePaginate)
const product = model(prodCollection, productSchema)

module.exports = product
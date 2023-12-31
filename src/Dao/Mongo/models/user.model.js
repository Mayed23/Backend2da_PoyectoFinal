const { Schema, model } = require (`mongoose`)
const mongoosePaginate = require (`mongoose-paginate-v2`)

const collection = `users`


const userSchema =  new Schema({
    first_name: {
        type: String,
        Required: true,
        index: true
    },
    last_name: {
        type: String
    },

    age: Number,

    email: {
        type: String,
        Required: true,
        Unique: true
    },  
    
    password: {
        type: String
    },
    role: {
        type: String,
        enum: [`user`, `admin`, `premiun`],
        Default: `user`
    }
 
    
})


userSchema.plugin(mongoosePaginate)
const userModel = model(collection, userSchema)


module.exports = { userModel }
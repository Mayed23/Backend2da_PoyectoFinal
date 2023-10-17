const { Schema, model } = require (`mongoose`)


const collection =  `messages`


const messageSchema = new Schema({
    user: {
        type: String,
        max: 100, 
        required: true
    },
    message: {
        type: String,
        max: 100,
        required: true
    }
})

const messageModel =  model(collection, messageSchema)

module.exports = { messageModel }
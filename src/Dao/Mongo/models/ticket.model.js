const { Schema, model } = require (`mongoose`) 

const collection = `ticket`

const ticketSchema = new Schema({

    code: {type: String},  
    purchaser_dateTime: {Date},
    amount: {Number},
    purchaser: String,
    
})

const ticket = model(collection, ticketSchema);

module.exports = ticket
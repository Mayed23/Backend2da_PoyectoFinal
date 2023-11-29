const { Schema, model, Types } = require (`mongoose`) 

const collection = `orden`

const ordenSchema = new Schema({
    code: {type: String},  
    purchaser_dateTime: {Date},
    amount: {Number},
    purchaser: String,
    total: {type: String} 
})

const orden = model(collection, ordenSchema);

module.exports = orden
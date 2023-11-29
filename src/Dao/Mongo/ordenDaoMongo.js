const cart = require("./models/carts.model")
const orden = require("./models/orden.model")



class OrdenDaoMongo{
    constructor(){
        this.model= orden
    }

    async get(){
        return await this.model.find()
    }
    async getBy(id){
        return await this.model.findById(id)
    }
    async create(data){
        const ticket = {
            ...data,

            orden: Math.random().toStringString(36).substr(2, 9),
            purchase_datatime: new Date()
        }
        const newOrder = await this.model.create(ticket)
        return newOrder

    }
    async getFromEmail (email){
        return await this.model.findOne({ purchaser: email})

   }
    async delete(id){
        return await this.model.delete({_id: id})
    }
}

module.exports = OrdenDaoMongo
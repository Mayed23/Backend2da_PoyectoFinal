const ticket = require("./models/ticket.model")



class TicketDaoMongo{
    constructor(){
        this.model= ticket
    }

    async create(ticket){
            const newticket = await this.model.create(ticket)
        return newticket

    }
    async getFromEmail (email){
        return await this.model.findOne({ purchaser: email})

    }

}

module.exports = TicketDaoMongo
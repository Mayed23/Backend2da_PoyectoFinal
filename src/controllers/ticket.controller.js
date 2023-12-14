const { ticketService, cartService } = require("../routes/service/service")

class TicketController {
    constructor(){
    this.ticketService = this.ticketService
    }

   

    createTicket = async (req, res) => {
        try{
            const user = req.user
            const cart = await cartService.getByUser(user.email)
            const data = {
                purchaser: user.email,
                amount: cart.total
            }
            const ticket = await ticketService.create(data)
            res.status(201).json(ticket)

        }catch(error){
            console.log(error)
        }
    }
    getTicketFromEmail = async (req, res) => {
        try{
            const user = req.user
            const ticket = await this.ticketService.getFromEmail(user.email)

            res.status(200).json(ticket)
        }catch(error){
            console.log(error)
        }

    }
    

}

module.exports = TicketController
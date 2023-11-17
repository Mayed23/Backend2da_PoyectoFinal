const { Router } = require(`express`)
const MessageController = require("../../controllers/messages.controller.js")


const msgRouter = Router()
const { 
    getMessages, 
    createMessages, 
    updateMessages, 
    deleteMessages 
} = new MessageController()  //hacemos un destructuring para mayor facilidad


msgRouter.get(`/`, getMessages)

msgRouter.post(`/`, createMessages)

msgRouter.put(`/:mid`, updateMessages)

msgRouter.delete(`/:mid`, deleteMessages)


module.exports = msgRouter
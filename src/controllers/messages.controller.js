const { messgeService } = require("../routes/service/service")

class MessageController{


    getMessages = async (req, res) => {
        const messages = await messgeService.getMessages()
        res.send({messages: messages})

    }

    createMessages = async (req, res) => {
        const result = await messgeService.createMessages()
        res.send({messages: result})
    }

    updateMessages = async (req, res) => {
        const result = await messgeService.updateMessages()
        res.send({messages: result})
    } 
    
    deleteMessages = async (req, res) => {
        const result = await messgeService.deleteMessages()
        res.send({messages: result}) 
    }    



}


module.exports = MessageController
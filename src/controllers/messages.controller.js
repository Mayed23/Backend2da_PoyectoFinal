const { messgeService } = require("../service/service.js")

class MessageController{


    getMessages = async (req, res) => {
        try{
            const messages = await messgeService.getMessages()
            res.send({messages: messages})
        }catch(error){
            return(error)
        }

    }

    createMessages = async (req, res) => {
        try{
        const newMessage = await messgeService.addMessages()
        res.send({messages: newMessage})
        }catch(error){
            return(error)
        }
    }

    updateMessages = async (req, res) => {
        const result = await messgeService.updateMessages()
        res.send({messages: result})
    } 
    
    deleteMessages = async (req, res) => {
        const result = await messgeService.deleteMessage()
        res.send({messages: result}) 
    }    



}


module.exports = MessageController
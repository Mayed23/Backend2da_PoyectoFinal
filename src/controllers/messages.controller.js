const { messgeService } = require("../routes/service/service")

class MessageController{


    getMessages = async (req, res) => {
        try{
            const messages = await messgeService.getMessage()
            res.send({messages: messages})
        }catch(error){
            return(error)
        }

    }

    createMessages = async (req, res) => {
        try{
        const newMessage = await messgeService.createMessage()
        res.send({messages: newMessage})
        }catch(error){
            return(error)
        }
    }

    updateMessages = async (req, res) => {
        const result = await messgeService.updateMessage()
        res.send({messages: result})
    } 
    
    deleteMessages = async (req, res) => {
        const result = await messgeService.deleteMessage()
        res.send({messages: result}) 
    }    



}


module.exports = MessageController
const { messageModel } = require("../Mongo/models/message.model.js")

class messageManagerMongo {
    constructor(){
        this.model=messageModel
    }

    async getMessages(){
        try{
            const message = await this.model.find().lean().exec()
            return message
        } catch (error){
            return (error)
            
        }
    }

    async createMessage() {
        try{
            const newMessage = await this.model.createMessage(message)
            return(newMessage) 
        } catch (error){
            return (error)
        }
    }

}

module. exports = { messageManagerMongo }
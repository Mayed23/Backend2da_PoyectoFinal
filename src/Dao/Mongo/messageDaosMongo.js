const { messageModel } = require("./models/message.model.js")

class MessageDaoMongo {

    
    
        async getMessages(){
            return await messageModel.find().getPopulatedPaths.exec()
        }
        async getByMessages(obj){
            return `get by messages`
        }
        async addMessages(newMessage){
            return await messageModel.create(newMessage)
          }
        updateMessages(mid){
            return `update messages`
        }
        deleteMessages(mid){
            return `delete messages`
        }

        
    }

module. exports = MessageDaoMongo
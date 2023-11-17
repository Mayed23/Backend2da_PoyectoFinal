const { messageModel } = require("./models/message.model.js")

class MessageDaoMongo {

    
    
        getMessages(){
            return `get messages`
        }
        getByMessages(obj){
            return `get by messages`
        }
        createMessages(){
            return `create messages`
        }
        updateMessages(mid){
            return `update messages`
        }
        deleteMessages(mid){
            return `delete messages`
        }

        
    }

//     async getMessages(){
//         try{
//             const message = await this.model.find().lean().exec()
//             return message
//         } catch (error){
//             return (error)
            
//         }
//     }

//     async createMessage() {
//         try{
//             const newMessage = await this.model.createMessage(message)
//             return(newMessage) 
//         } catch (error){
//             return (error)
//         }
//     }

// }

module. exports = MessageDaoMongo
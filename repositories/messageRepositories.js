class MessageRepository{

    constructor(dao){
        this.dao = dao

    }

    async getMessage(){
        return await this.dao.get()
    }
    async getMessageId(id){
        return await this.dao.getById()
    }

    async createMessage(newMessage){
        return await this.dao.create(newMessage)
    }
    
    async updateMessage(id,message){
        return await this.dao.update(id, message)
    } 
    async deleteMessage(id){
        return await this.dao.delete({_id: id})
    }
}

module.exports = MessageRepository

const { userModel } = require("./models/user.model");

class userManagerMongo {
    constructor(){
        this.model= userModel
    }

    async getUsers(){
        try{
            return await this.model.find({})
        } catch (error) {
            console.log(error)
        }
    }

    async getUser(uid){
        try{
            return await this.model.findOne({_id: uid})
        } catch (error) {
            console.log(error)
        }
    }
    async createUser(newUser){
        return await this.model.create(newUser)
    }
    async updateUser(){}
    async deleteUser(){}
}

module.exports = { userManagerMongo }
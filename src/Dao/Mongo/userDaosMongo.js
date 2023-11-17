const { userModel } = require("./models/user.model");

class UserDaoMongo {
    constructor(){
        this.model= userModel
    }

    async getUsers(query, options){
        return await this.model.paginate(query, options)
       
    }
    
    async getUserById(uid){
        return await this.model.findById({_id: uid})
    }

    async addUser(newUser){
        return await this.model.create(newUser);
    }

    async getUserByEmail(email){
        return await this.model.findOne({email: email})
    }
        
    async changePassword(email, newPassword){
        return await this.model.findOneAndUpdate({email: email}, {password: newPassword} )
    }

    async updateUser(id, user){
        return await this.model.findById(id, user)
    }

    async deleteUsers(id){
        return await this.model.deleteOne({ _id: id })
    }
}

module.exports = UserDaoMongo
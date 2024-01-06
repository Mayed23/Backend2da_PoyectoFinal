

class UserRepository{

    constructor(dao){
        this.dao = dao

    }

    async getAll(){
        return await this.dao.get()
    }
    async getUserById(id){
        return await this.dao.getById(id)
    }

    async getUserByEmail(email){
        return await this.dao.getByEmail(email)
    }

    async createUser(newUser){
        return await this.dao.create(newUser)
    }
    
    async updatePassword(email, newPassword){
        return await this.dao.changePassword({email: email}, {password: newPassword} )
      }

    async updateUser(id,user){
        return await this.dao.update(id, user)
    } 
    async deleteUser(id){
        return await this.dao.delete({_id: id})
    }
    // case "MEMORY":
}

module.exports = UserRepository


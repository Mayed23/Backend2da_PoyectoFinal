const { userModel } = require("./models/user.model.js");

class UserDaoMongo {
    constructor(){
        this.model= userModel
    }

    // async  read() {
    //     return await this.model.find();
    // }

    async get(query, options){
        return await this.model.find()
       
    }
    
    async getById(id){
        return await this.model.findById(id)
    }


    async getByEmail(email){
        return await this.model.findOne({email})
    }
    
    async create(newUser){
        return await this.model.create(newUser);
    }   
        
    async UpdatePassword(email, newPassword){
       return await this.model.findOneAndUpdate({email: email}, {password: newPassword} )
    }

    async updateRole(email){
        const user = await this.model.findOne({email: email});
        if(user.role === `user`) {
            const respuesta = await this.model.findOneAndUpdate({ email: email}, {role: `premiun`})
            return respuesta;
        }
        if(user.role === `premiun`) {
            const respuesta = await this.model.findOneAndUpdate({ email: email}, {role: `user`})
            return respuesta;
        }
    };

    async update(id, user){
        const userId = await this.model.findById(id)
        if(!user){
        return `Usuario no existe`
        }
        userId.set(user)
        await userId.save()
    }

    async delete(id){
        return await this.model.deleteOne({ _id: id })
    }
}

module.exports = UserDaoMongo
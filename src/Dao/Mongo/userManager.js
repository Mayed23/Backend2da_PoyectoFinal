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
    async createUser(newUser)
    {
           try 
            {
            let { first_name, last_name, email, password, role }= newUser;

            if(!first_name || !last_name || !email || !password || !role) 

            return `Ingrese todos los campos`
            const user = await this.model.create(newUser);   
            if(user)          
            return user;
            } catch (error) {
              console.error('Error al agregar el usuario:', error);
              return 'Error al agregar el usuario';
            }       
    }
    async updateUser(){}
    async deleteUser(){}
}

module.exports = { userManagerMongo }
const { userModel } = require("./models/user.model");

class userManagerMongo {
    constructor(){
        this.model= userModel
    }
async getUsers(){
        
        const users = await this.model.find({})
        return users
       
    }
    

    async getUserById(uid){
        
        return await this.model.findById({_id: uid})
    }


    async createUser(newUser)
    {
           try 
            {
            let { first_name, last_name, age, email, password, role }= newUser;

            if(!first_name || !last_name || !age || !email || !password || !role) 

            return `Ingrese todos los campos`
            const user = await this.model.create(newUser);   
            if(user)          
            return user;
            } catch (error) {
              console.error('Error al agregar el usuario:', error);
              return 'Error al agregar el usuario';
            }       
    }

    async getUsersByEmail(email){
       
        return await this.model.findOne({email: email})
    }
        
    async changePassword(email, newPassword){
        try{
            return await this.model.findOneAndUpdate({email: email}, {password: newPassword} )
        } catch (error) {
            console.log(error)
        }
    }

    async updateUser(id, userId){
        try{
            const user = await this.model.findById(id)
            if(!user){
                return `Usuario no encontrado`
            }
            user.set(userId)
            await user.save()
        }catch (error){
            return `Error cambios no realizados`
        }
    }

    async deleteUser(id){
        try{
            const user = await this.model.findById(id)
            if(!user){
                return `Usuario no encontrado`
            }
            await user.deleteOne()
            return `El ususario fue eliminado con Exito`
        }catch (error){
            console.error(`Error!!, usuario no eliminado:`, error)
            return `Error!!, usuario no eliminado`
        }
    }
}

module.exports = { userManagerMongo }
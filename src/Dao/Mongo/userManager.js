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

    async getUserById(uid){
        try{
            return await this.model.findById({_id: uid})
        } catch (error) {
            console.log(error)
        }
    }

    async getUserByEmail(email){
        try{
            return await this.model.findOne({email: email})
        }catch(error){
            console.log(error)
        }

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

    async getEmail(param){
        const user = await this.model.findOne(param)
        return user
    }

    async changePassword(email, password){
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
const { userService } = require("../routes/service/service")


class UserController{
    constructor(){
        this.userService = userService
    }

   getUsers = async (req, res) => {
    try{
        let users = await this.userService.getUsers({})
        res.send({
            status: `success`,
            payload: users
        })
        } catch (error) {
            console.log(error)
        }
    } 
    
    getUserById = async (req, res) => {
        try { 
            let id= req.params.id 
            let user = await this.userService.getUserById(id)
            res.send({
                status: `success`,
                payload: user
            })
        } catch (error) {
            console.log(error)
        }
    }

    getUserByEmail = async (req, res) => {
        try { 
            let email = req.params.email
            let user = await this.userService.getUserByEmail(email)
            console.log(user)
            res.send({
                status: `success`,
                payload: user
            })
        } catch (error) {
            console.log(error)
        }
    }

    createUser = async (req, res) => {
        const newUser = req.body
        try{
            let { first_name, last_name, age, email, password, role } = newUser
            
            if( !first_name || !last_name || !age || !email || !password || !role) 
            res.send({ status: `error`, error: `Ingrese todos los campos`})
            
            const user = await this.userService.addUser(newUser)
            console.log(user)
            res.status(200).json(user)
        }catch (error) {
            console.error('Error al agregar el usuario:', error);
            return 'Error al agregar el usuario';
        }
    }

    changePassword = async (req, res) => {
        try{
            const user = await this.userService.changePassword(email, newPassword)
            return `Su contraseña ha sido cambiada`
        }catch(error){
            console.log(error)
        } 
    }

    updateUser = async (req, res) => {
        let id= req.params.id
        let updateUser = req.body
        try{
            await this.usersService.updateUser(id, updateUser)
            
            const oneUser = await this.userService.getUserById(id)
            oneUser.set(updateUser)
            res.status(200).json({
                msg: `Usuario Actualizado`, oneUser
            })
            await oneUser.save()
        }catch(error){
            return `Cambios no realizados`
        } 
             
     }
    
    deleteUser =  async (req, res) => {
        let {id} = req.params
        try{
            const suprUser = await this.userService.deleteUsers({ _id: id})
            res.status(200).json({
                msg: `Usuario Eliminado con Exito`, suprUser
            })
        }catch(error){
            console.log(error)
        }
             
    }

}

module.exports = UserController

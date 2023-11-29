const UserDto = require("../Dto/user.dto.js")
const { userService } = require("../routes/service/service.js")


class UserController{
    constructor(){
        this.userService = userService
    }

   getUsers = async (req, res) => {
    try{
        const users = await this.userService.getAll({})
        console.log(req)

        if (!users){
            res.send({status:`error`, error: `No se encontraron los usuarios`})
        }
        res.send({
            status: `success`,
            payload: users
        })
        } catch (error) {
            console.log(error)
        }
    } 
    
    getUserById= async (req, res) => {
        try {
            
            let id = req.params.id 
            let user = await this.userService.getUserById(id)
            console.log(user)
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
            let { first_name, last_name, age, email, password, role } = new UserDto(newUser)
            
            if( !first_name || !last_name || !age || !email || !password || !role) 
            res.send({ status: `error`, error: `Ingrese todos los campos`})
            
            const user = await this.userService.createUser(newUser)
            console.log(user)
            res.status(200).json(user)
        }catch (error) {
            console.error('Error al agregar el usuario:', error);
            return 'Error al agregar el usuario';
        }
    }

    changePassword = async (req, res) => {
        try{
            const user = await this.userService.updatePassword(email, newPassword)
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
            
            const oneUser = await this.userService.getUserId(id)
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
            const suprUser = await this.userService.deleteUser({ _id: id})
            res.status(200).json({
                msg: `Usuario Eliminado con Exito`, suprUser
            })
        }catch(error){
            console.log(error)
        }
             
    }

}

module.exports = UserController

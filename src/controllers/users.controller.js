const UserDto = require("../Dto/user.dto.js")
const { userService } = require("../service/service.js")
const { logger } = require("../utils/loggers.js")

class UserController{
    constructor(){
        this.userService = userService
    }

   getUsers = async (req, res) => {
    try{
        const users = await this.userService.get()
            if (!users){
            res.send({
                status:`error`, 
                error: `No se encontraron los usuarios`
            })
        }
        res.send({
            status: `success`,
            payload: users
        })
        } catch (error) {
            logger.error(error)
        }
    } 
    
    getUserById= async (req, res) => {
        try {
            
            let id = req.params.id 
            let user = await this.userService.getById(id)
            logger.info(user)
            res.send({
                status: `success`,
                payload: user
            })
        } catch (error) {
            logger.error(error)
        }
    }

    getUserByEmail = async (req, res) => {
        try { 
            let email = req.params.email
            let user = await this.userService.getByEmail(email)
            logger.info(user)
            res.send({
                status: `success`,
                payload: user
            })
        } catch (error) {
            logger.error(error)
        }
    }

    createUser = async (req, res) => {
        const newUser = req.body
        try{
            let { first_name, last_name, age, email, password, role } = new UserDto(newUser)
            
            if( !first_name || !last_name || !age || !email || !password || !role) {
            res.send({ status: `error`, error: `Ingrese todos los campos`})
            }
            const user = await this.userService.create(newUser)
            logger.info(user)
            res.status(200).json(newUser)
        }catch (error) {
            logger.error('Error al agregar el usuario:', error);
            return 'Error al agregar el usuario';
        }
    }

    changePassword = async (req, res) => {
        try{
            await this.userService.UpdatePassword(email, newPassword)
            return `Su contraseña ha sido cambiada`
           
        }catch(error){
            logger.error(error)
            res.status(500).json({error: `Server internal error`})
        } 
    }

    changeRole = async (req, res) => {
        const id = req.params.id
        try{
            const user = await userService.getById(id)
            if(!user) res.status(404).json({
                msg:`Usuario no encontrado`
            });

            await userService.changeRole(user.email);
            const userUpdate = await userService.getById(id)
            res.status(200).json({ status: " success", msg: "El rol se ha cambiado exitosamente", newRole: userUpdate.role})
        }catch(error){
            logger.error(error.message);
            res.status(500). json({error: `Server internal error`})
        }
    }

    updateUser = async (req, res) => {
        let id= req.params.id
        let updateUser = req.body
        try{
            await this.userService.update(id, updateUser)
           logger.info(updateUser)

            const userOne = await this.userService.getById(id)
                res.status(200).json({
                msg: `Usuario Actualizado`, userOne
                })
        }catch(error){
            return `Cambios no realizados`
        }
    }
       
    deleteUser =  async (req, res) => {
        let {id} = req.params
        try{
            const suprUser = await this.userService.delete({ _id: id})
            res.status(200).json({
                msg: `Usuario Eliminado con Exito`, suprUser
            })
        }catch(error){
            logger.error(error)
        }
             
    }

}

module.exports = UserController

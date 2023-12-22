const { Router } = require(`express`)
const UserController = require("../../controllers/users.controller.js")

const userRouter = Router()
const {
    
    getUsers,
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser,
    changeRole,
} = new UserController()


userRouter.get(`/`, getUsers)
userRouter.get(`/:id`, getUserById)
userRouter.get(`/email/:email`, getUserByEmail)
userRouter.post(`/`, createUser)
userRouter.put(`/:id`, updateUser)
userRouter.delete(`/:id`, deleteUser)
userRouter.get(`/premium/:id`, changeRole)




module.exports = userRouter 
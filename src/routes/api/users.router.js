const { Router } = require(`express`)
const UserController = require("../../controllers/users.controller")

const userRouter = Router()
const {
    getUsers,
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser
} = new UserController()

userRouter.get(`/`, getUsers)
userRouter.get(`/:id`, getUserById)
userRouter.get(`/email/:email`, getUserByEmail )
userRouter.post(`/`, createUser)
userRouter.put(`/:id`, updateUser)
userRouter.delete(`/:id`, deleteUser)


module.exports = userRouter 
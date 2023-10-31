const { Router } = require(`express`)
const { userManagerMongo } = require(`../Dao/Mongo/userManager.js`)

const router = Router()
let userService = new userManagerMongo()

router.get(`/`, async (req, res) => {
    try { 
        let users = await userService.getUsers()
        res.send({
            status: `success`,
            payload: users
        })
    } catch (error) {
        console.log(error)
    }
})
router.get(`/:id`, async (req, res) => {
    try { 
        let id= req.params.id 
        let user = await userService.getUserById(id)
        res.send({
            status: `success`,
            payload: user
        })
    } catch (error) {
        console.log(error)
    }
})

router.get(`/:email`, async (req, res) => {
    try { 
        let email = req.params
        let user = await userService.getUserByEmail({email: email})
        console.log(user)
        res.send({
            status: `success`,
            payload: user
        })
    } catch (error) {
        console.log(error)
    }
})

router.put(`/:id`, async (req, res) => {
   let id= req.params.id
   let updateUser = req.body
   res.send(await userService.updateUser(id, updateUser))
   console.log(updateUser)

})


router.post(`/`, async (req, res) => {
    let newUser = req.body
        try{
            const addUser = await userService.createUser(newUser)
            res.status(200).json(addUser)
        }catch(error){
            console.log(error)
        }
})

router.delete(`/:id`, async (req, res) => {
    let id= req.params.id
    res.send(await userService.deleteUser(id))
      
})



module.exports = router 
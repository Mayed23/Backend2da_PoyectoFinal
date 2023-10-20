const { Router } = require(`express`)
const { userManagerMongo } = require(`../Dao/Mongo/userManager`)

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
        let user = await userService.getUser(id)
        res.send({
            status: `success`,
            payload: user
        })
    } catch (error) {
        console.log(error)
    }
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


        // const { first_name, last_name, email, password, rol }= req.body

        //     if (!first_name || !last_name || !email || !password || !rol) 
          
        //   return res.status(400).send({ status: 400, error: 'Faltan datos' })
          
        //     res.redirect("/login")
        // } catch (error) 
        // {
        //     res.status(500).send("Error al acceder al registrar: " + error.message);
        // }




module.exports = router 
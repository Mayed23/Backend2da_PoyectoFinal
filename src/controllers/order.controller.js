const { orderService, cartService } = require("../routes/service/service")

class OrderController {
    constructor(){
    this.orderService = orderService
    }

    getOrder = async (req, res) => {
        try{
            const order = await this.orderService.getOrder()
            res.status(200).json({
               status: "success", 
               payload: order
            })   
       }catch(error){
           console.log(error)
       }

    } 

    getOrderById = async (req, res) => {
        const id = req.params.id
        try{
            const order = await this.orderService.getOrderById(id)
            res.status(200).json({
               status: "success", 
               payload: order
            })   
       }catch(error){
           console.log(error)
       }
    }

    deleteOrder = async (req, res) => {
        let {id} = req.params.id
        try{
            const order = await this.orderService.deleteOrder({ _id: id})
            res.status(200).json({
                msg: `Orden Eliminada con Exito`, order
            })
        }catch(error){
            console.log(error)
        }
    }

    createOrder = async (req, res) => {
        try{
            const user = req.user
            const cart = await cartService.getCart(user.email)

        }catch(error){
            console.log(error)
        }

    }
    

}
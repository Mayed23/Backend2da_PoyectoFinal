const { cartService } = require("../routes/service/service.js");



class CartsController{
    constructor(){
        this.cartService = cartService
    }

   createCarts = async (req, res) => {
    let cartNew = req.body
    try{
        const cart = await this.cartService.addCarts(cartNew)
        res.status(200).json(cart)
    }catch(error){
        console.error('Error al crear el carrito de compras:', error);
        return 'Error al crear el carrito de compras';
    }

    }

    getCarts = async (req, res) => {
        try{
             const carts = await this.cartService.getCarts()
             res.status(200).json({
                status: "success", 
                payload: carts
             })   
        }catch(error){
            console.log(error)
        }
       
    }

    getCartsById =  async (req, res) => {
    
        try{
            let id = req.params.id
            let cartId = await this.cartService.getCartsById(id)
            if(!cartId) res.status(404)
        
            res.send({
                status: `success`,
                payload: cartId
            }) 
        }catch(error){
            console.log(error)
        }
    }

    deleteCarts = async (req, res) => {
        let {id} = req.params
        try {
            const cartId = await this.cartService.getCartsById(id);
            if (!cartId) {
              return "Carrito no encontrado";
            }
            await cartService.deleteCarts({ _id: id });
            res.status(200).json({
                msg: `Se ha eliminado correctamente Cart : ${id}`
            });
          } catch (error) {
            return error;
          } 
    }

    createProductToCarts = async (req, res) => {
        try {
            const carId = req.params.id
            const prodId = req.params.id
            const result = await this.cartService.addProductToCart(carId, prodId)
            if(result.hasOwnProperty('error')) {
                throw new Error(result.error.msg)
            }
            console.log(result)
            res.json(result)    
    
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    }

    deleteProdCarts =async (req, res) => {
        const carId = req.params.cid
        const prodId = req.params.pid
        try{
            const deleteCart = await this.cartService.deleteCarts(carId, prodId)
            res.status(200).json({
            msg: `Carrito Eliminado con Exito`, deleteCart})
        }catch(error){
            console.log(error)
        }
        
    }

}

module.exports = CartsController
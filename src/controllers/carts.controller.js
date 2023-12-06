const { cartService, productService } = require("../routes/service/service.js");



class CartsController{
    constructor(){
        this.cartService = cartService
    }

   createCarts = async (req, res) => {
    let cartNew = req.body
    try{
        const cart = await this.cartService.create()
        res.status(200).json(cart)
    }catch(error){
        console.error('Error al crear el carrito de compras:', error);
        return 'Error al crear el carrito de compras';
    }

    }

    getCarts = async (req, res) => {
        try{
             const carts = await this.cartService.get()
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
            let cartId = await this.cartService.getById(id)
            if(!cartId) res.status(404).json({ message: `Carrito no encontrado`})
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
            const cartId = await this.cartService.getById(id);
            if (!cartId) {
              return "Carrito no encontrado";
            }
            await cartService.delete({ _id: id });
            res.status(200).json({
                msg: `Se ha eliminado correctamente Cart : ${id}`
            });
          } catch (error) {
            return error;
          } 
    }

    createProductToCarts = async (req, res) => {
        const{ carId, prodId }= req.params
        try {
                        
            const cart = await cartService.getById(carId)
            console.log(cart)
            if (!cart) {
                return "Carrito no encontrado";
            }
            const product = await productService.getBy(prodId)
            if(!product) return res.status(404).json({
                message: `Producto no encontrado`
            })
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

    createProductInUserCart = async (req, res) => {
        try{
            const prodId = req.params
            const user = req.session

            const product = await productService.getBy(prodId)
            if(!product) return res.status(404).json({
                message: `Producto no encontrado`
            })

            const result = await cartService.addProductToCart(user.cart, prodId)
            res.status(200).json({
                message: `Producto agregado al carrito`, products: response.products
            })
            
        }catch(error){
            console.log(error)
        }
    }

    deleteProdCarts =async (req, res) => {
        const carId = req.params.cid
        const prodId = req.params.pid
        try{
            const deleteCart = await this.cartService.delete(carId, prodId)
            res.status(200).json({
            msg: `Carrito Eliminado con Exito`, deleteCart})
        }catch(error){
            console.log(error)
        }
        
    }

    purchaseCart = async (req, res) => {
        const carId = req.params.id
        const user =  req.sesion.user
        
        try{
            const cart = await this.cartService.get(carId);
            if(!cart) return res.status(404).json({message: `carrito no encontrado`})

            const result = await cartService.purchaseCart(carId, user)

            res.status(200).json({ message: `Compra realizada`, result})
        }catch(error){
            console.log(error)
        }
    }

}

module.exports = CartsController
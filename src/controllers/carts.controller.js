const { cartService, productService, userService } = require("../routes/service/service.js");



class CartsController{
    constructor(){
        this.cartService = cartService
    }

   createCarts = async (req, res) => {
    let cartNew = req.body
    try{
        const cart = await this.cartService.create(cartNew)
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
        try {
          const carId = req.params.cid || 0;
          const prodId = req.params.pid;

          const result = await cartService.addProductToCart(carId, prodId);

          if (result.hasOwnProperty('error')) {
            throw new Error(result.error.msg);
          }

          console.log(result);
          res.json({ message: 'Producto agregado al carrito', cart: result});
        } catch (error) {
          console.error(error);
          res.status(500).send(error.message);
        }
      };
     
      createProductInUserCart = async (req, res) => {
        try {
          const prodId = req.params.pid;
          const user = req.session.user;

          if (!user.cart) {
            const newCart = await cartService.create();
            user.cart = newCart._id; 
            await userService.update(user._id, { cart: newCart._id });
          }
      
          
          const product = await productService.getById(prodId);
          if (!product) return res.status(404).json({ 
            message: `Producto no encontrado`
         });
      
          const result = await cartService.addProductToCart(user.cart, prodId);
          res.status(200).json({ 
          message: `Producto agregado al carrito`, products: result.cart.products 
          });
        } catch (error) {
          console.error(error);
          res.status(500).send(error.message);
        }
      };
      


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
        const user =  req.session.user
        
        try{
            const cart = await this.cartService.getById(carId);
            if(!cart) return res.status(404).json({message: `carrito no encontrado`})

            const result = await cartService.purchaseCart(carId, user)

            res.status(200).json({ message: `Compra realizada`, result})
        }catch(error){
            console.log(error)
            res.status(500).send(error.message)
        }
    }

}

module.exports = CartsController
const { cartService, productService, userService } = require("../routes/service/service.js");
const { logger } = require("../utils/loggers.js");


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
            logger.error(error)
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
          logger.error(error)
        }
    }

    getCartByUsers =  async (req, res) => {
    
      try{
          let uid = req.params.id
          let cartId = await this.cartService.getByUser(uid)
          if(!cartId) res.status(404).json({ message: `Carrito no encontrado`})
              res.send({
              status: `success`,
              payload: cartId
          }) 
      }catch(error){
        logger.error(error)
      }
  }
  deleteCarts = async (req, res) => {
    let { id } = req.params;
    try {
        // Obtener el carrito antes de eliminarlo
        const cart = await this.cartService.getById(id);

        if (!cart) {
            return res.status(404).json({
                error: "Carrito no encontrado"
            });
        }

        // Eliminar el carrito
        await this.cartService.delete({ _id: id });

        // Devolver productos al inventario
        for (const product of cart.products) {
            const productId = product.id;
            const productInInventory = await productService.getById(productId)


            if (productInInventory) {
                // Incrementar el stock en el inventario
                await productService.update(
                    { _id: productId },
                    { stock: productInInventory.stock + product.quantity }
                );
            }
        }

        return res.status(200).json({
            msg: `Se ha eliminado correctamente el carrito y se ha devuelto el stock al inventario`
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Error interno del servidor"
        });
    }
}


    // deleteCarts = async (req, res) => {
    //     let {id} = req.params
    //     try {
    //         const cartId = await this.cartService.getById(id);
    //         if (!cartId) {
    //           return "Carrito no encontrado";
    //         }
    //         await cartService.delete({ _id: id });
    //         res.status(200).json({
    //             msg: `Se ha eliminado correctamente Cart : ${id}`
    //         });
    //       } catch (error) {
    //         return error;
    //       } 
    // }

    

    createProductToCarts = async (req, res) => {
        try {
          const carId = req.params.cid || 0;
          const prodId = req.params.pid;

          const result = await cartService.addProductToCart(carId, prodId);

          if (result.hasOwnProperty('error')) {
            throw new Error(result.error.msg);
          }

          logger.info(result);
          res.json({ message: 'Producto agregado al carrito', cart: result});
        } catch (error) {
          logger.error(error);
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
          logger.error(error);
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
          logger.error(error)
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
          logger.error(error)
            res.status(500).send(error.message)
        }
    }

}

module.exports = CartsController
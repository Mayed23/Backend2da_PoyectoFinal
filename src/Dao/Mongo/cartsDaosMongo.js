const { logger } = require("../../utils/loggers.js");
const sendEmail = require("../../utils/sendEmail.js");
const cart  =  require(`./models/carts.model.js`); 
const product  = require(`./models/products.model.js`); 
const ticket = require("./models/ticket.model.js");


module.exports = class CartsDaoMongo {
    constructor(){
        this.model= {
            cart,
            product, 
            ticket
        }
    }

    get = async () => {
      return await this.model.cart.find({});
    };

    getByUser = async (userId) => {
     

      const cart =  await this.model.cart.find({userId})

      if(cart.length == 0){

        return this.model.cart.create({userId})
      }
      
      return (cart[0])
    }
    
    create = async () => {
      return await this.model.cart.create({})
    };
    
    getById = async (id) => {
      return await this.model.cart.findById(id)
    };
  
    delete = async (id) => {
      
      return await this.model.cart.deleteOne({ _id: id });

    };  
  

    addProductToCart = async (cartId = 0, productId) => {
      let existingCart = {}
      try {
        // Verificar si el producto existe
        const existingProduct = await this.model.product.findById(productId);
        if (!existingProduct) {
          return {
            error: {
              status: 404,
              msg: 'Producto no existe'
            }
          };
        }
        if(cartId == 0){
         
         existingCart =  await this.model.cart.create({})
        }else{
          existingCart = await this.model.cart.findById(cartId);
        }
        logger.info("Este es el resultado de Model cart", existingCart)
        if (existingCart == {}) {
          
          return {
            error: {
              status: 404,
              msg: 'Carrito no existe'
            }
          };
        }
        
        logger.info('Cart antes de Agregar productos' , existingCart.products)
        
        // Verificar si el producto ya está en el carrito
        const productInCart = existingCart.products.find(p => p.product._id.toString() === existingProduct._id.toString());
    
        logger.info('Product In Cart',productInCart)
        if (productInCart === undefined) {
          logger.info('******* No Existe Producto en el Carrito *****');
          

          // Si el producto  está en el carrito, verificar si hay suficiente stock
          if (existingProduct.stock < 1) {
            return {
              error: {
                status: 400,
                msg: 'No hay suficiente stock para el producto'
              }
            };
          }
    
          logger.info('Crear Producto en el Carrito');
          existingCart.products.push({
            product: existingProduct._id,
            quantity: 1
          });

        } else {
          // Si el producto ya está en el carrito, verificar si hay suficiente stock para aumentar la cantidad
          logger.info('========== Si Existe Producto en el Carrito ========');
          
            if (existingProduct.stock < (productInCart.quantity + 1)) {
              return {
                error: {
                  status: 400,
                  msg: 'No hay suficiente stock para aumentar la cantidad del producto en el carrito'
                }
              };
            }
    
            logger.info('Actualizar Cantidad del Producto en el Carrito');
          productInCart.quantity += 1;
        }

        // Actualizar el stock del producto
        existingProduct.stock -= 1;
        // Guardar los cambios en el producto y el carrito
        await Promise.all([existingProduct.save(), existingCart.save()]);
    
        return existingCart;
      }catch (error) {
        logger.error(error);
        throw error;
      }
    };
      
    
    deleteProdToCart = async (cartId, prodId) => {
      try {
  
        const existingCart = await this.model.cart.findById(cartId)
        if ( existingCart) return {
          error: {
            status: 404,
            msg: 'Cart no existe'
          }
        }
        const productsCart = existingCart.products.filter(p => p.product._id.toString() !== prodId)
  
       existingCart.products = productsCart

       
  
        await existingCart.save()
  
        return existingCart
  
      } catch (error) {
        logger.error(error);
        return error;
      }
  
    };

    purchaseCart = async (cartId, user) => {
      const cart = await this.model.cart.findById(cartId);
    
      let productsOutOfStock = [];
      let productsInStock = [];
    
      for (const productEntry of cart.products) {
        const product = productEntry.product;
    
        if (product.stock >= productEntry.quantity) {
          productsInStock.push(product);
    
          // Realiza la acción necesaria si hay suficiente stock
          await this.deleteProdToCart(cartId, product._id);
          await this.model.product.findByIdAndUpdate(
            product._id,
            { $inc: { stock: -productEntry.quantity } }, // Utiliza $inc para decrementar el stock
          );
        } else {
          productsOutOfStock.push(product);
        }
      }
    
      // Si no hay productos con suficiente stock, detén la compra
      if (productsInStock.length === 0) {
        return `No hay Stock suficiente para realizar su Compra`;
      }
    
      const total = productsInStock.reduce((acc, productEntry) => {
        return acc + productEntry.product.price * productEntry.quantity;
      }, 0);
    
      const order = await this.model.ticket.create({
        purchase: user.email,
        product: productsInStock,
        amount: total,
      });
    
      // Actualiza el total del carrito después de la compra
      await this.sumaTotal(cartId);
    
      // Enviar correo electrónico de confirmación de pedido
      sendEmail(order);
    
      return order;
    };
  

    sumaTotal = async (carId) => {
      const cart = await this.model.cart.findById(carId);
      const total = cart.products.reduce((acc, product) => {
        return acc + product.product.price * product.quantity;
      }, 0);
    
      await this.model.cart.findByIdAndUpdate(
        { _id: carId },
        { $set: { total: total } }
      );
    
      return total;
  };

}  
 
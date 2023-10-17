const cart  =  require(`./models/carts.model.js`) 
const  product  = require(`./models/products.model.js`) 



module.exports = class cartsManagerMongo {
    constructor(){
        this.model= {
            cart,
            product
        }
    }

    getCarts = async () => {
        try {
          const carts = await this.model.cart.find({});
          return carts;
        } catch (error) {
          return error;
        }
      };
    
      addCarts = async () => {
        try {
          const cartNew = await this.model.cart.create({});
          return cartNew //, `Carrito de compras creado con éxito`;
        } catch (error) {
          return `Error al crear el carrito de compras`;
        }
      };
    
      getCartsById = async (id) => {
        try {
          const cartId = await this.model.cart.findById(id);
          if (!cartId) {
            return "Carrito no encontrado";
          }
          return cartId;
        } catch (error) {
          return `carrito no existe`;
        }
      };
    
      deletCarts = async (id) => {
        try {
          const cartId = await this.model.cart.findById(id);
          if (!cartId) {
            return "Carrito no encontrado";
          }
          await this.model.cart.deleteOne({ _id: id });
          return `Se ha eliminado correctamente Cart : ${id}`;
        } catch (error) {
          return error;
        }
      };  
    
      addProductToCart = async (carId, prodId) => {
        try {
          const existProduct = await this.model.product.findById(prodId)
          if (!existProduct) return {
            error: {
              status: 404,
              msg: 'Producto no existe'
            }
          }
    
          const existCart = await this.model.cart.findById(carId)
          if (!existCart) return {
            error: {
              status: 404,
              msg: 'Cart no existe'
            }
          }
    
          const productsCart = existCart.products.find(p => p.product._id.toString() === existProduct._id.toString())
    
          if (productsCart === undefined) {
            console.log('Crea Producto')
            existCart.products.push({
              product: existProduct._id,
              quantity: 1
            })
          } else {
            console.log('Actualiza Producto')
            const productsUpdated = existCart.products.map(p => {
              if (p.product._id.toString() === existProduct._id.toString()) {
                return {
                  ...p,
                  quantity: p.quantity + 1
                }
              }
              return p
            })
    
            existCart.products = productsUpdated
          }
    
          await existCart.save()
    
          return existCart
    
        } catch (error) {
          console.log(error);
          throw error
        }
      };
    
      deleteProdToCart = async (cartId, prodId) => {
        try {
    
          const existCart = await this.model.cart.findById(cartId)
          if (!existCart) return {
            error: {
              status: 404,
              msg: 'Cart no existe'
            }
          }
          const productsCart = existCart.products.filter(p => p.product._id.toString() !== prodId)
    
          existCart.products = productsCart
    
          await existCart.save()
    
          return existCart
    
        } catch (error) {
          console.log(error);
          return error;
        }
    
      };
    
    }
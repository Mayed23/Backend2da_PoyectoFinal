const cart  =  require(`./models/carts.model.js`) 
const  product  = require(`./models/products.model.js`) 



module.exports = class CartsDaoMongo {
    constructor(){
        this.model= {
            cart,
            product
        }
    }

    getCarts = async () => {
      return await this.model.cart.find({});
    };
    
    addCarts = async () => {
      return await this.model.cart.create({})
    };
    
    getCartsById = async (cid) => {
      return await this.model.cart.findById(cid)
    };
  
    deleteCarts = async (id) => {
      return await this.model.cart.deleteOne({ _id: id });

    };  
  
    addProductToCart = async (carId, prodId) => {
      
          //CODIGO LOGICA PENDIENTE DE INCORPORAR....
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
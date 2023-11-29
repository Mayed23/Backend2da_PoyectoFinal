const { sendOrderEmail } = require("../../utils/sendOrderEmail.js");
const cart  =  require(`./models/carts.model.js`); 
const orden = require("./models/orden.model.js");
const  product  = require(`./models/products.model.js`) 



module.exports = class CartsDaoMongo {
    constructor(){
        this.model= {
            cart,
            product, 
            orden
        }
    }

    get = async () => {
      return await this.model.cart.find({});
    };
    
    create = async () => {
      return await this.model.cart.create({})
    };
    
    getById = async (cid) => {
      return await this.model.cart.findById(cid)
    };
  
    delete = async (id) => {
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

    purchaseCart = async (cartId, user) => {
      const cart = await this.model.cart.findById(cartId)

      let productsOutOfStock = []
      let productsInStock = []

      for (const product of cart.products){

        if(product.product.stock > product.quantity){
          productsInStock.push(product)

          await this.deleteProdToCart(cartId, product.product._id)

          await this.model.product.updateOne(product.product._id, {stock: product.product.stock - product.quantity
          })
          await sumaTotal(cartId)
        }else{
          productsOutOfStock.push(product)
        }
      }

      const total = productsInStock.reduce((acc, product) =>{
        return acc + product.product.price * product.quantity
      }, 0)

      if(productsInStock.length === 0) return `No hay Stock suficiente para realizar su Compra`

      const order = await this.model.orden.create({
        
        purchase: user.email,
        product: productsInStock,
        amount: total
      })

      await sumaTotal(cartId)

      sendOrderEmail(order)
      return order
    }
      
    sumaTotal = async (carId) => {
      const cart = await this.model.cart.findById(carId)
      const total = cart.products.reduce ((acc, product) => {
        return acc + product.price * product.quantity
    }, 0)

    await this.model.cart.findByIdAndUpdate ({_id: id}, { $set: { total}})

    return total 
  
  }
} 

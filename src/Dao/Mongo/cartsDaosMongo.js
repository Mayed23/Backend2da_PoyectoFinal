const { logger } = require("../../utils/loggers.js");
const sendEmail = require("../../utils/sendEmail.js");
const cart = require(`./models/carts.model.js`);
const product = require(`./models/products.model.js`);
const ticket = require("./models/ticket.model.js");

module.exports = class CartsDaoMongo {
  constructor() {
    this.model = {
      cart,
      product,
      ticket,
    };
  }

  get = async () => {
    return await this.model.cart.find({});
  };

  getByUser = async (userId) => {
    const cart = await this.model.cart.find({ userId }).lean();
    if (cart.length == 0) {
      return this.model.cart.create({ userId });
    }

    return cart[0];
  };

  create = async () => {
    return await this.model.cart.create({});
  };

  getById = async (id) => {
    return await this.model.cart.findById(id);
  };

  delete = async (id) => {
    return await this.model.cart.deleteOne({ _id: id });
  };


  sumTotal = async (cid) => {
    
    const cart = await this.model.cart.findById(cid);
    console.log(cart)

    const total = cart.products.reduce((acc, product) => {
      return acc + product.product.price * product.quantity;
    }, 0);
    console.log(typeof(product.price))
    console.log(typeof(product.quantity)) 
    console.log(total,`nnnn`)

    // seteamos el total del carrito
    await this.model.cart.findOneAndUpdate({ _id: cid }, { $set: { total } });

    
    return total;
  };

  addProductToCart = async (cid, pid) => {
    
    const cart = await this.model.cart.findOne({ _id: cid });
    const cartUpdate = await this.model.cart.findOneAndUpdate(
      { _id: cid, "products.product": pid },
      { $inc: { "products.$.quantity": 1 } },
      { new: true }
    );

    if (!cartUpdate) {
      const newCart = await this.model.cart.findByIdAndUpdate(
        cid,
        { $push: { products: { product: pid, quantity: 1 } } },
        { new: true }
      );
      const total = await this.sumTotal(cid);
      await this.model.cart.findOneAndUpdate({ _id: cid }, { $set: { total } });
      return newCart;
    }
    const total = await this.sumTotal(cid);
    await this.model.cart.findOneAndUpdate({ _id: cid }, { $set: { total } });
    return cart;
  };

  deleteProdToCart = async (cartId, prodId) => {
    try {
      const existingCart = await this.model.cart.findById(cartId);
      if (!existingCart)
        return {
          error: {
            status: 404,
            msg: "Cart no existe",
          },
        };
      const productsCart = existingCart.products.filter(
        (p) => p.product._id.toString() !== prodId
      );

      existingCart.products = productsCart;

      await existingCart.save();

      return existingCart;
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
          { $inc: { stock: -productEntry.quantity } } // Utiliza $inc para decrementar el stock
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
    // sendEmail(order);

    return order;
  };

  sumaTotal = async (carId) => {
    const cart = await this.model.cart.findById(carId);
    const total = cart.products.reduce((acc, product) => {
      return acc + product.product.price * product.quantity;
    }, 0);

    await this.model.cart.findByIdAndUpdate({ _id: carId }, { $set: { total: total } });

    return total;
  };

};





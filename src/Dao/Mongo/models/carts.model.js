const { Schema, model } = require (`mongoose`)


const collection = `carts`


const cartSchema = new Schema({
    products: [{
      product:{
        type: Schema.Types.ObjectId,
        ref: "products",
      },
      quantity: Number
    }]
  });
  
  cartSchema.pre(/^find/, function (next) {
    this.populate("products.product");
    next();
  });
  
  cartSchema.pre(/^save/, function (next) {
    this.populate("products.product");
    next();
  });
  
  const cart = model(collection, cartSchema);
  
module.exports =  cart
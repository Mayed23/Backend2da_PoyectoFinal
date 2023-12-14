const { Schema, model } = require (`mongoose`)


const collection = `carts`


const cartSchema = new Schema({
  userId:{
    type: String
   },
    products: {
      type:[{
        product:{
        type: Schema.Types.ObjectId,
        ref: "products",
      },
      quantity: Number
      }]
    },
    total: {
      type: Number,
      default: 0
    }
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
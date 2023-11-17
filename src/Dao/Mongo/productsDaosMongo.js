const product = require("./models/products.model");

module.exports = class ProductDaoMongo {
  constructor() {
    this.model = product;
  }

  readProducts = async () => {
    return await this.model.find();
  };

  addProducts = async (newProduct) => {
    return await this.model.create(newProduct);
  };

  getProducts = async (query, options) => {
    return await this.model.paginate(query, options);
  };

  getProductById = async (pid) => {
    return await this.model.findById(pid);
  };

  getProductsLimit = async (limit) => {
    return await this.model.find({ limit: limit });
  };

  updateProductsById = async (id, product) => {
    return await this.model.findById(id, product);
  };

  deleteProducts = async (id) => {
    return await this.model.deleteOne({ _id: id });
  };
};

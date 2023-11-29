const product = require("./models/products.model");

module.exports = class ProductDaoMongo {
  constructor() {
    this.model = product;
  }

  // read = async () => {
  //   return await this.model.find();
  // };

  create = async (newProduct) => {
    return await this.model.create(newProduct);
  };

  get = async (query, options) => {
    return await this.model.paginate(query, options);
  };

  getBy = async (pid) => {
    return await this.model.findById(pid);
  };

  getLimit = async (limit) => {
    return await this.model.find({ limit: limit });
  };

  update = async (id, product) => {
    return await this.model.findById(id, product);
  };

  delete = async (id) => {
    return await this.model.deleteOne({ _id: id });
  };
};

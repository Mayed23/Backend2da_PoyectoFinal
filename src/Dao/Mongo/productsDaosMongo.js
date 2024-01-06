const product = require("./models/products.model");

module.exports = class ProductDaoMongo {
  constructor() {
    this.model = product;
  }

  // read = async () => {
  //   return await this.model.find();
  // };

  create = async (code, newProduct) => {
    
    const existCode = await this.model.findOne(code)
    if(existCode){
      return `Código ya Existe`
    }
    return await this.model.create(newProduct);
  };

  get = async (query, options) => {
    return await this.model.paginate(query, options);
  };

  getById = async (pid) => {
    return await this.model.findById(pid);
  };

  update = async (id, product) => {
    const prod = await this.model.findById(id)
    if(!product){
    return`Producto no encontrado`
    }
    prod.set(product)
    await prod.save()
  };

  delete = async (id) => {
    return await this.model.deleteOne({ _id: id });
  };

 


};

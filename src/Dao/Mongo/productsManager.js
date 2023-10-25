const  product = require("./models/products.model");

module.exports = class productManagerModel {  
    constructor() {
        this.model = product
    }

 readProducts = async () => {
    let products = await this.model.find();
    return products;
  };

  // writeProducts = async (product) => {
  //     await fs.writeFile(this.path, JSON.stringify(product))
  // }

  addProducts = async (newProduct) => {
    let { title, price, description, thumbnail, status, stock, code, category } = newProduct;

    if (!title || !price || !description || !thumbnail || !status || !stock || !code || !category)
      return `Ingrese todos los Campos`;

    const product = await this.model.create(newProduct);
    if(product)
    return product;
  };

  getProducts = async (query, options) => {
      const allProducts = await this.model.paginate(query, options);
      return allProducts; 
  };

  getProductById = async (pid) => {
        const product = await this.model.findById(pid)
        if(!product) return `producto no encontrado`
        return product
  };
  

  getProductsLimit = async (limit) => {
      const products = await this.model.find().limit(limit);
      const productsList = [];
      for (let i = 0; 1 < limit; i++) {
        productsList.push(products[i]);
      }
      return productsList();
    
  };
  exist = async (id) => {
    let product = await this.model.findById(id);
    return product.find((prod) => prod.id === id);
  };

  updateProductsById = async (id, product) => {
      const prod = await this.model.findById(id)
      if(!prod){
          return `Producto no encontrado`
      }
      prod.set(product)
      await prod.save()
  }

  deleteProducts = async (id) => {
      const product = await this.model.findById(id);
      if (!product) {
        return `Producto no existe`;
      }
      await this.model.deleteOne(product);
      return `Producto eliminado con exito`;
  };
  
  //funciona y muestra el array en consola, verificar la ruta.....(Paginate)
  getProductsPage = async (req, res) => {
    try {
      const prodPage = await this.model.paginate(
        { model: `Aveo` },
        { limit: 2, page: 1 }
      );
      console.log(prodPage), res.send({ status: `success`, payload: prodPage });
    } catch (error) {
      return error;
    }
  };

}
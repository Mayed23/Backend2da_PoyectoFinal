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
    let { name, model, price, img, code, category, stock } = newProduct;

    if (!name || !model || !price || !img || !code || !category || !stock)
      return `Ingrese todos los Campos`;

    const product = await this.model.create(newProduct);

    return product;
  };

  getProducts = async ({limit=5, page=1, sort=1, category}) => {
    try {
      const allProducts = await this.model.paginate({}, {limit, page, sort, category, lean:true});
      return allProducts;
    } catch (error) {
      return error;
    }
  };

  getProductsById = async (id) => {
    try {
      console.log(id);
      const prodId = await this.model.findById(id);

      console.log(prodId);

      if (!prodId) {
        return "Producto no encontrado";
      }

      return prodId;
    } catch (error) {
      return `Id, no existe.`;
    }
  };

  getProductsLimit = async (limit) => {
    try {
      const products = await this.model.find().limit(limit);
      const productsList = [];
      for (let i = 0; 1 < limit; i++) {
        productsList.push(products[i]);
      }

      return productsList();
    } catch (error) {
      return error;
    }
  };
  exist = async (id) => {
    let product = await this.model.findById(id);
    return product.find((prod) => prod.id === id);
  };

  updateProductsById = async (_id, product) => {
    try {
      const prodId = await this.model.findById(_id);
      if (!prodId) {
        return "Producto no encontrado";
      }
      prodId.set(product);
      await product.updateProductsById(_id);
      return product
    
      {
        return `Producto modificado con éxito`;
      }
    } catch (error) {
      return `Cambios no se guardaron`;
    }
  };

  deleteProducts = async (id) => {
    try {
      const product = await this.model.findById(id);
      if (!product) {
        return `Producto no existe`;
      }
      await this.model.remove(product);
      return `Producto eliminado con exito`;
    } catch (error) {
      return `error al elimina vuelva intentarlos.`;
    }
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
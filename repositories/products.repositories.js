
class ProducstRepository{
    constructor(dao){
      this.dao = dao
    }
    async getProducts(){
        return await this.dao.get()
    }
    async getProductById(id){
        return await this.dao.getBy(id)
    }

    async getProductByLimit(limit){
        return await this.dao.getlimit(limit)
    }

    async createProduct(newProduct){
        return await this.dao.create(newProduct)
    }
   
    async updateProduct(id, product){
        return await this.dao.update(id, product)
    } 
    async deleteProduct(ide){
        return await this.dao.delete({_id: id})
    }
}

module.exports = ProducstRepository

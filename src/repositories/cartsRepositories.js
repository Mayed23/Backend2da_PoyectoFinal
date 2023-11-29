class CartsRepository{

    constructor(dao){
        this.dao = dao

    }

    async getCarts(){
        return await this.dao.get()
    }
    async getCartId(id){
        return await this.dao.getById()
    }

    async createCarts(){
        return await this.dao.create({})
    }
   
    async deleteCarts(id){
        return await this.dao.delete({_id: id})
    }

    async addItemToCarts(carId, prodId){
        return await this.dao.addProductToCarts(carId, prodId)
    }

    async deleteItemToCart(cartId, prodId){
        return await this.dao.deleteProdToCart(cartId, prodId)
    }
    async purchaseCart(carId, user){
        return await this.dao.purchaseCart(carId, user)
    }
}

module.exports = CartsRepository


class OrderRepository{
    constructor(dao){
      this.dao = dao
    }
    async getOrder(){
        return await this.dao.get()
    }
    async getOrderById(id){
        return await this.dao.getBy(id)
    }
    async createOrder(newOrder){
        return await this.dao.create(newOrder)
    }
   
    async getOrderFromEmail (email){
        return await this.dao.getFromEmail({ purchaser: email})

   }
    async deleteOrder(id){
        return await this.dao.delete({_id: id})
    }
}

module.exports = OrderRepository
const CartsDaoMongo = require("../../Dao/Mongo/cartsDaosMongo");
const MessageDaoMongo = require("../../Dao/Mongo/messageDaosMongo");
const ProductDaoMongo = require("../../Dao/Mongo/productsDaosMongo");
const UserDaoMongo = require("../../Dao/Mongo/userDaosMongo");




const userService    = new UserDaoMongo()
const productService = new ProductDaoMongo()
const cartService   = new CartsDaoMongo()
const messgeService  = new MessageDaoMongo()

module.exports = {
    userService,
    productService,
    cartService,
    messgeService
}

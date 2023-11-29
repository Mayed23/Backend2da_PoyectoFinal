const CartsDaoMongo = require("../../Dao/Mongo/cartsDaosMongo.js");
const CartsRepository = require("../../repositories/cartsRepositories.js");

const MessageDaoMongo = require("../../Dao/Mongo/messageDaosMongo.js");
const MessageRepository = require("../../repositories/messageRepositories.js");

const ProductDaoMongo = require("../../Dao/Mongo/productsDaosMongo.js");
const ProducstRepository = require("../../repositories/products.repositories.js");

const UserDaoMongo = require("../../Dao/Mongo/userDaosMongo.js");
const UserRepository = require("../../repositories/users.repositories.js");

const OrderRepository = require("../../repositories/orderRepositories.js");
const OrdenDaoMongo = require("../../Dao/Mongo/ordenDaoMongo.js");





const userService    = new UserRepository(new UserDaoMongo())
const productService = new ProducstRepository(new ProductDaoMongo())
const cartService   = new CartsRepository(new CartsDaoMongo())
const messgeService  = new MessageRepository(new MessageDaoMongo())
const orderService   = new OrderRepository(new OrdenDaoMongo())

module.exports = {
    userService,
    productService,
    cartService,
    messgeService,
    orderService
}

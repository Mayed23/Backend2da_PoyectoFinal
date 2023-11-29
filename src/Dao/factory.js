//Sirve para elegir el archivo de la persistencia

const { configObject: { persistence, connectDb} } = require("../config/confi.js");


let MessageDao
let UserDao
let ProductDao
let CartDao

console.log(persistence)

switch (persistence) {
    case "MONGO": 
        connectDb()
        const MessageDaoMongo = await import(`./Mongo/messageDaosMongo.js`)
        const UserDaoMongo = await import(`./Mongo/userDaosMongo.js`)
        const ProductDaoMongo = await import(`./Mongo/productsDaosMongo.js`);
        const CartsDaoMongo = await import(`./Mongo/cartsDaosMongo.js`)
            
        MessageDao = MessageDaoMongo
        UserDao = UserDaoMongo
        ProductDao =  ProductDaoMongo
        CartDao = CartsDaoMongo
        break;

    // case "MEMORY":
    //     break
}

module.exports = {
    MessageDao, 
    UserDao,  
    ProductDao, 
    CartDao,
} 
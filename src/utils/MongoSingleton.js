const mongoose  = require("mongoose");
const { logger } = require("./loggers");


class MongoSingleton {
       static #instance
   
       constructor(mongo_url){
        mongoose.connect(mongo_url,{
            // useNewUrlParse: true,
            useUnifiedTopology: true
            
        })
    }
    static getInstance(mongo_url){
        if(this.#instance){
            logger.info(msg`Base de dato ya creada`)
            return this.#instance
        }
        this.#instance = new MongoSingleton(mongo_url)
        logger.info(`Base de datos CONECTADA`)
        this.#instance
    }
}

module.exports = MongoSingleton
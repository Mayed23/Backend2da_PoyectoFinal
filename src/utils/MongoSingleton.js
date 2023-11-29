const mongoose  = require("mongoose");


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
            console.log(msg`Base de dato ya creada`)
            return this.#instance
        }
        this.#instance = new MongoSingleton(mongo_url)
        console.log(`Base de datos CONECTADA`)
        this.#instance
    }
}

module.exports = MongoSingleton
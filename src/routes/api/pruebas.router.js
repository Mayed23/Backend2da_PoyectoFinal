const { Router } = require("express");
const sendEmail = require("../../utils/sendEmail.js");
const { generateUsers } = require("../../utils/fakerUsers.js");
const compression = require("express-compression");
const { generateProducts } = require("../../utils/generateProducts.js");
const {CustomError} = require("../../utils/errors/CustomError.js");
const { EErrors } = require("../../utils/errors/enums.js");
//const { fork } = require(`child_process`)




const routerprueba = Router()


routerprueba.get(`/test/user`, (req, res) => {
    res.send({
        first_name: faker.person.first_name(),  
        last_name: faker.person.last_name(),
        email: faker.person.first_name(),
        password: faker.person.password()
    })
})


routerprueba.get(`/sencilla`, (req, res) => {
    let suma = 0
    for(let i = 0; i < 1000000; i++){
        suma += 1
    }
    res.send({suma})
})

routerprueba.get(`/compleja`, (req, res) => {
    let suma = 0
    for(let i = 0; i < 5e8; i++){
        suma += 1
    }
    res.send({suma})
})


//artillery quick --count 40 --num 50 `http://localhost:8080/pruebas/sencilla` -o sencilla.json
//artillery quick --count 40 -- num 50 `http://localhost:8080/pruebas/compleja` -o compleja.json

//artillery run config.yml --output testPerformance.json

// routerprueba.get(`/warning`, (req,res) => {
//     // req.logger.warning(`warning en la ruta de pruebas`)
//     //req.logger.fatal(`warning en la ruta de pruebas`)
//    // req.logger.error(`warning en la ruta de pruebas`)
//     res.send(`ejecutar el warning`)
// })

// /////compresion con Brotli

// //344 B transferido,2.4 MB recursos,Finalizar: 2.06 s,DOMContentLoaded: 2.82 s,Cargar: 2.82 s

// routerprueba.use(compression({
//     brotli:{
//         enabled: true,
//         zlib:{}
//     }
// }))



// //compresion con gzip
// //routerprueba.use(compression())  //7.5 kB transferido,2.4 MB recursos,Finalizar: 2.18 s,DOMContentLoaded: 2.64 s,Cargar: 2.64 s


// //2.4 MB transferido,2.4 MB recursos,Finalizar: 50.03 s,DOMContentLoaded: 50.18 s,Cargar: 50.18 s
// routerprueba.get(`/comp`, (req, res) =>{
//     let string = (`hola este es un string sumamente largo de prueba`)
//     for (let i=0; i < 5e4; i++){
//         string += `hola este es un string sumamente largo de prueba`
//     }
//     res.send(string)
// })

routerprueba.get(`/monkingproducts`, (req, res)=>{
    
    try{
        const prodMonk = generateProducts()
         if (prodMonk.length > 1) CustomError({
            name: `Error mock`, 
            message: `Error al generar productos Mock`, 
            cause: `Error en el servidor`, 
            code: EErrors.PRODUCT_NOT_FOUND
        })
            
        
        res.status(200).json(prodMonk);
    }catch(error){
        logger.error(error)
        res.status(500).json({msg: `Error en el Servidor`})
    }

})

// // const operacionCompleja = () => {
// //     let result = 0
// //     for (let i = 0; i < 5e9; i++) {
// //         result += i
// //     }
// //     return result
// // }



// routerprueba.get (`/block`, (req,res) => {
//     const result = operacionCompleja()
//     res.send({
//         message: `El resultado es: ${result}`
//     })
// })


// routerprueba.get(`/no-block`, (req,res) => {
//     res.send({
//         message: `El resultado es: ${result}`
//     })
// })


// routerprueba.get(`/email`, async (req, res) =>{
//     return await sendEmail()
// })

module.exports=routerprueba
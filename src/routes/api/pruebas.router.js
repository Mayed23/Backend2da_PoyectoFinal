const { Router } = require("express");
const sendEmail = require("../../utils/sendEmail.js");
//const { fork } = require(`child_process`)



const routerprueba = Router()
// const operacionCompleja = () => {
//     let result = 0
//     for (let i = 0; i < 5e9; i++) {
//         result += i
//     }
//     return result
// }



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
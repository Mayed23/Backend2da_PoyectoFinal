const { Router } = require("express");
const { fork } = require(`child_process`)



const routerprueba = Router()
const operacionCompleja = () => {
    let result = 0
    for (let i = 0; i < 5e9; i++) {
        result += i
    }
    return result
}



routerprueba.get (`/block`, (req,res) => {
    const result = operacionCompleja()
    res.send({
        message: `El resultado es: ${result}`
    })
})


routerprueba.get(`/no-block`, (req,res) => {
    res.send({
        message: `El resultado es: ${result}`
    })
})


module.exports=routerprueba
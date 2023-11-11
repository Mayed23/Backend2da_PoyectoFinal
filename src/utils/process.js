const { Command } = require (`commander`)


// const program = new Command()


// program
//     .option(`-d`, `Variable para debug`, false)
//     .option(`-p <port>`, `Variable para el puerto`, 8080)
//     .option(`--mode <mode>`, `Modo de ejecución de la aplicación`, `development`)
//     .parse()


// console.log(`Options:`, program.opts())  
// console.log(`Argumento:`, program.args)  

// console.log(process.cwd())
// console.log (process.pid)
// console.log (process.memoryUsage())
// console.log (process.argv)
// console.log (process.version)

//process Listener


process.on (`exit`, code => {
    console.log(`antes de salir de proceso`)
})

process.on(`uncaughtException`, exception => {
    console.log(`Este atrapa todos los errores no contolados una variable o función que no exista`, exception)
})

process.on(`message`, message => {
    console.log(`mandar mensaje a otro proceso`)
})

console.log(`ejecutando cód`)

console.log(fede)


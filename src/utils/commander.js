const { Command } = require (`commander`)

// const program = new Command()


// program
//     .option(`-d`, `Variable para debug`, false)
//     .option(`-p <port>`, `Variable para el puerto`, 8080)
//     .option(`--mode <mode>`, `Modo de ejecución de la aplicación`, `development`)
//     .parse()


// console.log(`Options:`, program.opts())  
// console.log(`Argumento:`, program.args)  


const program = new Command

program
     .option(`--mode <mode>`, `Modo ejecución de app`, `development`)
     .parse()

module.exports = {
    program
}


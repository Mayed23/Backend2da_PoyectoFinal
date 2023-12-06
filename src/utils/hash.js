const bcrypt = require (`bcrypt`)



const  createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

const isValidPass = (password, user) => {
    console.log(password, user.password,(password === user.password))
    const response =  bcrypt.compareSync(password, user.password)
    console.log(password, user.password,response)
    
    return response
}

module.exports = {
    createHash, isValidPass
}
const bcrypt = require (`bcrypt`)



const  createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

const isValidPass = (password, user) => bcrypt.compareSync(password, user.password)


module.exports = {
    createHash, 
    isValidPass
}
class UserDto {
    constructor(newUser){

        this.first_name = newUser.first_name
        this.last_name  = newUser.last_name
        this.age        = newUser.age
        this.email      = newUser.email
        this.password   = newUser.createHash(password)
        this.role       = newUser.role
    }
}

module.exports = UserDto
const { faker } = require("@faker-js/faker")

faker.local = `es`

const generateProducts = () => {
    return {
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        departament: faker.commerce.department(),
        stock: faker.string.numeric(),
        description: faker.commerce.productDescription(),
        id: faker.database.mongodbObjectId(),
        image: faker.image.url()

    }
}

exports.generateUsers = () => {

    let numberOfProduct = parseInt(faker.string.numeric(1, {bannedDigits: [0]}))
    let products = []
    for (let i = 0; i < numberOfProduct; i++){
        products.push(generateProducts())
    }

    return{
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        birthDate: faker.date.birthdate(),
        phone: faker.phone.number(),
        image: faker.image.avatar(),
        id: faker.database.mongodbObjectId(),
        email: faker.internet.email(),
        products
    }
}
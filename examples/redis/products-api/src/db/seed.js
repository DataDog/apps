const mongoose = require('mongoose')
const faker = require('faker') 

const {
    createConnection,
    createRedisClient
} = require('./index')
const ProductModel = require('../models/product')
const UserModel = require('../models/user')


const NUMBER_OF_PRODUCTS = 10000
const NUMBER_OF_USERS = 200


async function insertProducts(client) {
    for (let i = 1; i <= NUMBER_OF_PRODUCTS; i++) {
        const productName = faker.commerce.productName()
        const productDescription = faker.commerce.productDescription()
        const productPrice = faker.commerce.price()

        const Product = new ProductModel({
            name: productName,
            description: productDescription,
            price: productPrice
        })
        const product = await Product.save()

        client.set(
            `productId:${product.id}`,
            JSON.stringify(product)
        )
    }
}


async function insertUsers(client) {
    for (let i = 1; i <= NUMBER_OF_USERS; i++) {
        const username = faker.internet.userName()
        const emailAddress = faker.internet.exampleEmail()
        const password = faker.internet.password()

        const User = new UserModel({
            username: username,
            emailAddress: emailAddress,
            password: password
        })
        const user = await User.save()

        client.set(
            `userId:${user.id}`,
            JSON.stringify(user)
        )
    }
}


async function main() {
    await createConnection()
    const redisClient = createRedisClient()
    await redisClient.connect()

    console.log('Seeding products')
    await insertProducts(redisClient)
    console.log('Done seeding products')

    console.log('Seeding users')
    await insertUsers(redisClient)
    console.log('Done seeding users')

    process.exit()
}

main()


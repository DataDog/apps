'use strict'
const express = require('express')
const jsonParser = require('body-parser').json

const {
    createConnection,
    createRedisClient
} = require('./db/index')
const products = require('./routes/products')
const users = require('./routes/users')


const app = express()
const port = process.env.PORT || 3020


app.use(jsonParser())

app.use('/api/v1/products', products)
app.use('/api/v1/users', users)

app.listen(port, async () => {
    await createConnection()

    const redisClient = createRedisClient() 
    await redisClient.connect()
    console.log('Redis: connection successful')

    console.log(`Magic Happens on port ${port}`)
})


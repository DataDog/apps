'use strict'

const express = require('express')

const { createRedisClient } = require('../db/index')
const ProductModel = require('../models/product')

const router = express.Router()

router.get('/', async (req, res) => {
    const { query: { page } } = req
    
    const productsPerPage = 10

    const products = await ProductModel
        .find()
        .limit(productsPerPage)
        .skip(productsPerPage * page)
        .sort({
            id: 'asc'
        })

    res.json({
        data: products
    }) 
})

router.post('/', async (req, res) => {
    res.send('Post request on product endpoint')
})

router.get('/:productId', async (req, res) => {
    const { params: { productId } } = req

    const redisClient = createRedisClient() 
    await redisClient.connect()

    // @TODO: Put different client names
    await redisClient.sendCommand(["CLIENT", "SETNAME", "products-api"])

    // @TODO: Redis Data and MongoDB data are not formatted the same
    let product = null

    product = await redisClient.get(`productId:${productId}`)
    if (product) {
        return res.json({
            data: JSON.parse(product) 
        })
    }

    product = await ProductModel.findById(productId)
    res.json({
        data: product 
    })
})

router.put('/:productId', async (req, res) => {
    const { 
        params: { productId },
        body: {
            name,
            description,
            price
        }
    } = req

    const data = await ProductModel.updateOne(
        {
            "_id": productId
        }, {
            name: name,
            description: description,
            price: price
        }
    )

    res.send('success')
})

module.exports = router


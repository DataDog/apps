'use strict'

const express = require('express')

const { createRedisClient } = require('../db/index')

const router = express.Router()

router.get('/', async (req, res, next) => {
    res.send('Get request on users endpoint')
})

router.post('/', async (req, res, next) => {
    res.send('Post request on users endpoint')
})

router.get('/:userId', async (req, res, next) => {
    const { params: { userId  } } = req

    const redisClient = createRedisClient() 
    await redisClient.connect()

    await redisClient.sendCommand(["CLIENT", "SETNAME", "products-api"])

    res.send(`Get request on userId ${userId}`)
})

module.exports = router


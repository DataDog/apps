'use strict'

const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    emailAddress: String,
    password: String
})

const User = mongoose.model('User', UserSchema)

module.exports = User


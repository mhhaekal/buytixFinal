const express = require('express')
const Router = express.Router()

// Import All Controller
const { ticketsController } = require('../controllers')

Router.post('/', ticketsController.create)

module.exports = Router
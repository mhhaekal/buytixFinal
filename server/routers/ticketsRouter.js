const express = require('express')
const Router = express.Router()

// Import All Controller
const { ticketsController } = require('../controllers')

Router.post('/', ticketsController.create)
Router.get('/', ticketsController.getCategory)
Router.get('/category/:id', ticketsController.getTicket)
Router.get('/category/name/:id', ticketsController.getCatName)
Router.get('/all', ticketsController.getAllTicket)


module.exports = Router
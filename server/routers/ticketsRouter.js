const express = require('express')
const Router = express.Router()

// Import All Controller
const { ticketsController } = require('../controllers')
const upload = require('./../middleware/upload')

Router.post('/', upload, ticketsController.create)
Router.get('/', ticketsController.getCategory)
Router.get('/category/:id', ticketsController.getTicket)
Router.get('/category/name/:id', ticketsController.getCatName)
Router.get('/all', ticketsController.getAllTicket)
Router.get('/detail/:id', ticketsController.getTicketDetail)
Router.get('/location', ticketsController.getLocation)
Router.get(`/reff`, ticketsController.referralCode)
Router.post(`/buy`, ticketsController.buyTicket)
Router.post(`/refid`, ticketsController.getRefId)
Router.post(`/createref`, ticketsController.createReferral)
Router.get(`/filtercat`, ticketsController.filterCat)


module.exports = Router
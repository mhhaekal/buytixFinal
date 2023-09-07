const express = require('express');
const Router = express.Router();

// Import All Controller
const { usersController } = require('../controllers');

Router.get('/login', usersController.login);
Router.post('/register', usersController.register);

module.exports = Router;
const express = require('express');
const Router = express.Router();

// Import All Controller
const { usersController } = require('../controllers');


// Import JWT
const { verify } = require("./../lib/jwt");

// Router.get('/login', usersController.login);
// Router.post('/register', usersController.register);
Router.get('/user', usersController.getUser);
Router.patch('/userid/:id', usersController.updatePoint);
Router.patch('/buypoint', usersController.buyWithPoint);
Router.post('/userid', usersController.getUserId);

Router.get("/login", usersController.getOneUser);
Router.get("/data/:token", verify, usersController.getTokenUser);
Router.post("/", usersController.register);
Router.get("/verif/:token", verify, usersController.verifyTokenUser);
Router.get("/trans/:token", verify, usersController.getTransaction);
Router.get("/myevent/:token", verify, usersController.getSellerTicket);
module.exports = Router;
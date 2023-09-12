const express = require("express");
const Router = express.Router();

// Import All Controller
const { usersController } = require("../controllers");

// Import JWT
const { verify } = require("./../lib/jwt");
Router.get('/user', usersController.getUser);
Router.patch('/userid/:id', usersController.updatePoint);
Router.patch('/buypoint', usersController.buyWithPoint);
Router.post('/userid', usersController.getUserId);
Router.get("/", usersController.login);
Router.get("/login", usersController.getOneUser);
Router.post("/", usersController.register);
Router.get("/verif/:token", verify, usersController.verifyTokenUser);
// Router.get("/user", usersController.getUser);

module.exports = Router;

const express = require("express");
const Router = express.Router();

// Import All Controller
const { usersController } = require("../controllers");

Router.get("/", usersController.login);
Router.post("/", usersController.register);
Router.get("/user", usersController.getUser);

module.exports = Router;

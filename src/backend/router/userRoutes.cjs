const express = require('express');
const userController = require('../controller/userController.cjs')
const routes = express.Router();

routes.get('/detail', userController.getUserDetail)

module.exports = routes;
const express = require('express');
const routes = express.Router();
const storeController = require('../controller/controller.cjs')

routes.get('/', storeController.getProducts)

module.exports = routes;
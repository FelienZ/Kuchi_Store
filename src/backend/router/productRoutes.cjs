const express = require('express');
const routes = express.Router();
const productsController = require('../controller/productsController.cjs')

routes.get('/', productsController.getProducts)

module.exports = routes;
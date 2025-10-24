const express = require('express');
const routes = express.Router();
const productsController = require('../controller/productsController.cjs');
const verifyAccessToken = require('../middleware/verifyAccessToken.cjs');

//product
routes.get('/', productsController.getProducts)

//wishlist
routes.post('/addwishlist', verifyAccessToken, productsController.addWishlist)

module.exports = routes;
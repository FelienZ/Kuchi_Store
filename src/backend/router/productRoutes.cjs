const express = require('express');
const routes = express.Router();
const productsController = require('../controller/productsController.cjs');
const verifyAccessToken = require('../middleware/verifyAccessToken.cjs');

//product
routes.get('/', productsController.getProducts)

//wishlist
routes.get('/getwishlist', verifyAccessToken, productsController.getWishlist)
routes.post('/addwishlist', verifyAccessToken, productsController.addWishlist)
routes.delete('/deleteWishlist', verifyAccessToken, productsController.removeWishlist)

module.exports = routes;
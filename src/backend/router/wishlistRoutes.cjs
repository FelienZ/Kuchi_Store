const express = require('express')
const verifyAccessToken = require('../middleware/verifyAccessToken.cjs')
const routes = express.Router()
const wishlistController = require('../controller/wishlistController.cjs')

//wishlist(Customer)
routes.get('/getwishlist', verifyAccessToken, wishlistController.getWishlist)
routes.post('/addwishlist', verifyAccessToken, wishlistController.addWishlist)
routes.delete('/deleteWishlist', verifyAccessToken, wishlistController.removeWishlist)

module.exports = routes
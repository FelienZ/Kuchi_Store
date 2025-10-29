const express = require('express')
const routes = express.Router()
const verifyAccessToken = require('../middleware/verifyAccessToken.cjs')
const orderController = require('../controller/orderController.cjs')

routes.get('/getorder', verifyAccessToken, orderController.getOrder)
routes.post('/makeorder', verifyAccessToken, orderController.makeOrder)

module.exports = routes
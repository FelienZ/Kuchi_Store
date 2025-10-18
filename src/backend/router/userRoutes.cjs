const express = require('express');
const userController = require('../controller/userController.cjs');
const verifyAccessToken = require('../middleware/verifyAccessToken.cjs');
const routes = express.Router();

routes.get('/me', verifyAccessToken, userController.getUserDetail)

module.exports = routes;
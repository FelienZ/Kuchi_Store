const express = require('express');
const userController = require('../controller/userController.cjs');
const verifyAccessToken = require('../middleware/verifyAccessToken.cjs');
const routes = express.Router();

routes.get('/me', verifyAccessToken, userController.getUserDetail)
routes.put('/edit', verifyAccessToken, userController.editUserDetail)

module.exports = routes;
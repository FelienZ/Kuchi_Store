const express = require('express');
const authController = require('../controller/authController.cjs');
const router = express.Router()

router.post('/register', authController.postRegister)
router.post('/login', authController.postAuthentication)

module.exports = router
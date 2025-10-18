const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateAccessToken(payload) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
        expiresIn: '15m',
    })
}

function generateRefreshToken(payload){
    return jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, {
        expiresIn:'7d'
    })
}

function verifyRefreshToken(token){
    try {
        return jwt.verify(token, process.env.REFRESH_TOKEN_KEY)
    } catch (error) {
        throw new Error('Refresh Token Tidak valid')
    }
}

function verifyAccessToken(token){
    try {
        return jwt.verify(token, process.env.ACCESS_TOKEN_KEY)
    } catch (error) {
        throw new Error('Access Token Tidak valid')
    }
}

module.exports = {
    generateAccessToken, generateRefreshToken, verifyRefreshToken, verifyAccessToken
}
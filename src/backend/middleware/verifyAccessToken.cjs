const jwt = require('jsonwebtoken');

function verifyAccessToken(req, res, next){
    const authHeader =req.headers.authorization;
    if(!authHeader){
        return res.status(400).json({status: 'fail', message: 'token tidak valid'})
    }
    const token = authHeader.split(' ')[1]
    try {
        const data = jwt.verify(token, process.env.ACCESS_TOKEN_KEY)
        req.user = data
        next()
    } catch (error) {
        return res.status(400).json({status: 'fail', message: 'token tidak valid'})
    }
}

module.exports = verifyAccessToken
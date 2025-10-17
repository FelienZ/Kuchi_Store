const { verifyAccessToken } = require("../services/token/tokenManager.cjs");

module.exports = (req, res, next) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json({message: 'Unauthorized'})
        try {
            const payload = verifyAccessToken(token)
            req.user = payload
            next()
        } catch (error) {
            return res.status(500).json({message: `Kesalahan Server: ${error.message}`})
        }
}
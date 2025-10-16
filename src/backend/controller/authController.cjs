const authServices = require('../services/authServices.cjs');
const tokenManager = require('../services/token/tokenManager.cjs');
const usersServices = require('../services/usersServices.cjs');
const { postAuthSchema, postRegisterSchema, putAuthSchema, deleteAuthSchema } = require('../validator/authValidator.cjs');

//handler Login -> postAuth
exports.postAuthentication = async(req, res) => {
    try {
        const {error} = postAuthSchema.validate(req.body)
        if(error){
            return res.status(400).json({
                message: `input tidak valid: ${error.details[0].message}`,
                status: 'fail'
            })
        }
        const {email, password} = req.body;
        const id = await usersServices.verifyUserCredentials(email, password)

        const accessToken = tokenManager.generateAccessToken({id})
        const refreshToken = tokenManager.generateRefreshToken({id})
        
        await authServices.addRefreshToken(refreshToken)
        const userData = await usersServices.getUserById(id)
        
        res.status(201).json({status: 'success', message: 'Berhasil Terotentikasi', data: {user: userData , accessToken, refreshToken}})
    } catch (error) {
        res.status(500).json({status: 'fail', message: 'Kesalahan Server'})
    }
}

exports.postRegister = async(req, res) => {
    try {
        const {error} = postRegisterSchema.validate(req.body)
            if(error){
                return res.status(400).json({
                    message: `input tidak valid: ${error.details[0].message}`,
                    status: 'fail'
                })
            }
        const user = await usersServices.addUser(req.body);
        res.status(201).json({status: 'success', message: 'berhasil terdaftar', data: user})
    } catch (error) {
        res.status(500).json({status: 'fail', message: 'Kesalahan Server'})
    }
}

exports.putAuthentication = async(req, res) => {
    try {
        const { error } = putAuthSchema.validate(req.body)
        if(error){
            return res.status(400).json({
                message: `token tidak valid: ${error.details[0].message}`,
                status: 'fail'
            })
        }
        const { refreshToken } = req.body;
        await authServices.verifyRefreshToken(refreshToken)
        const { id } = tokenManager.verifyRefreshToken(refreshToken)

        const accessToken = tokenManager.generateAccessToken({id})
        res.status(200).json({status: 'success', message: 'berhasil memperbarui token', data: accessToken})
    } catch (error) {
        res.status(500).json({status: 'fail', message: 'Kesalahan Server'})
    }
}

exports.deleteAuthentication = async(req, res) => {
    const { error } = deleteAuthSchema.validate(req.body);
    if(error){
        return res.status(400).json({
            message: `token tidak valid: ${error.details[0].message}`,
            status: 'fail'
    })
    }
    const { refreshToken } = req.body;
    await authServices.verifyRefreshToken(refreshToken)
    await authServices.deleteRefreshToken(refreshToken)

    res.status(200).json({status: 'success', message: 'berhasil menghapus token'})
}
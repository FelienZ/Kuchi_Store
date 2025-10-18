const authServices = require('../services/authServices.cjs');
const tokenManager = require('../services/token/tokenManager.cjs');
const usersServices = require('../services/usersServices.cjs');
const { postAuthSchema, postRegisterSchema } = require('../validator/authValidator.cjs');

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
        
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 15, //15menit
            secure: false,
            sameSite: 'lax'
        })
        
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24 * 7
        });

        res.status(201).json({status: 'success', message: 'Berhasil Terotentikasi', data: {user: userData}})
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
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.status(400).json({status: 'fail', message: 'refreshToken Tidak Valid'})
        await authServices.verifyRefreshToken(refreshToken) // cek ke db
        const { id } = tokenManager.verifyRefreshToken(refreshToken) // cek status token

        const accessToken = tokenManager.generateAccessToken({id})
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 15,
            secure: false,
            sameSite: 'lax'
        });
        res.status(200).json({status: 'success', message: 'berhasil memperbarui token'})
    } catch (error) {
        res.status(500).json({status: 'fail', message: `Kesalahan Server: ${error.message}`})
    }
}

exports.deleteAuthentication = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.status(400).json({status: 'fail', message: 'refreshToken Tidak Valid'})
    
        await authServices.verifyRefreshToken(refreshToken)
        await authServices.deleteRefreshToken(refreshToken)
    
        res.clearCookie('accessToken')
        res.clearCookie('refreshToken')
    
        res.status(200).json({status: 'success', message: 'berhasil menghapus token'})
    } catch (error) {
        res.status(500).json({status: 'fail', message: `Kesalahan Server: ${error.message}`})
    }
}
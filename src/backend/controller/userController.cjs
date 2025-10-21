const usersServices = require('../services/usersServices.cjs')

exports.getUserDetail = async(req, res) => {
    try {
        // const id = req.body;
        const data = await usersServices.getUserById(req.user.id)
        // console.log('cek data: ', data)
        res.status(201).json({status: 'success', data: data })
    } catch (error) {
        res.status(400).send({type: 'fail', message: 'Gagal Mendapatkan Data'})
    }
}

exports.editUserDetail = async(req, res) => {
    try {
        const id = req.user.id
        const data = req.body
        const newProfile = await usersServices.updateUserProfile(id, data)
        res.status(201).send({type: 'success', message: 'Berhasil Memperbarui Profile!', newProfile})
    } catch (error) {
        res.status(404).send({type: 'fail', message: 'User Tidak Ditemukan'})
    }
}

exports.editAccount= async(req, res) => {
    try {
        const id = req.user.id
        const data = req.body
    } catch (error) {
        res.status(404).send({type: 'fail', message: 'User Tidak Ditemukan'})
    }
}
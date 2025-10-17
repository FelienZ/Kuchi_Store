const usersServices = require('../services/usersServices.cjs')

exports.getUserDetail = async(req, res) => {
    try {
        // const id = req.body;
        const data = await usersServices.getUserById(req.user.id)
        console.log('cek data: ', data)
        res.status(201).json({status: 'success', data: data })
    } catch (error) {
        res.status(400).send({type: 'fail', message: 'Gagal Mendapatkan Data'})
    }
}
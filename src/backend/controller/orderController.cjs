const orderServices = require('../services/orderServices.cjs')

exports.makeOrder = async(req, res)=>{
    try {
        const orderData = req.body
        const userId = req.user.id
        await orderServices.postOrder(userId, orderData)
        res.status(201).json({type:'success', message: 'success post order'})
    } catch (error) {
        res.status(400).json({type: 'fail', message: `failed post Order: ${error.message}`})
    }
}

exports.getOrder = async(req, res) => {
    try {
        const userId = req.user.id
        const data = await orderServices.getAllOrder(userId)
        res.status(200).json({type:'success', message: 'success get order', data})
    } catch (error) {
        res.status(400).json({type: 'fail', message: `failed get Order: ${error.message}`})
    }
}

exports.destroyOrder = async(req, res) => {
    try {
        const orderId = req.body
        const userId = req.user.id
        await orderServices.deleteOrder(userId, orderId)
        res.status(200).json({type:'success', message: 'success delete order'})
    } catch (error) {
        res.status(404).json({type: 'fail', message: `failed delete Order: ${error.message}`})
    }
}
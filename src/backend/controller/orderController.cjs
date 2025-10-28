const orderServices = require('../services/orderServices.cjs')

exports.makeOrder = async(req, res)=>{
    try {
        const orderData = req.body
        const userId = req.user.id
        await orderServices.postOrder(userId, orderData)
        res.status(201).json({type:'success', message: 'success post order'})
    } catch (error) {
        console.log(error)
        res.status(400).json({type: 'fail', message: `failed post Order: ${error.message}`})
    }
}
const productServices = require('../services/productServices.cjs')
exports.getProducts = async(req, res)=> {
    try {
        const data = await productServices.getProducts()
        res.status(200).json({type: 'success', payload: data}) 
    } catch (error) {
        res.status(400).json({type: 'fail', message: 'failed to get data'})
    }
}
exports.postProducts = async(req, res)=> {
    res.status(201).json('Hello World')
}

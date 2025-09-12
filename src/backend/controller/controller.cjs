const productServices = require('../services/productServices/productServices.cjs')
exports.getProducts = async(req, res)=> {
    try {
        const data = await productServices.getProducts()
        res.status(200).json(data) 
    } catch (error) {
        res.status(400).json({message: 'failed to get data'})
    }
}
exports.postProducts = async(req, res)=> {
    res.status(201).json('Hello World')
}

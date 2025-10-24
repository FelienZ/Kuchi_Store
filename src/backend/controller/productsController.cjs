const productServices = require('../services/productServices.cjs')
const wishlistServices = require('../services/wishlistServices.cjs')

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
exports.addWishlist = async(req, res)=> {
    try {
        const productId = req.body
        const userId = req.user.id
        const isClaimed = await wishlistServices.checkWishlistItem(productId, userId)
        // console.log('cek apakah claimed: ', isClaimed)
        if(isClaimed){
            return res.status(409).json({type: 'fail', message: 'Produk Sudah Ada di Wishlist'})
        }
        // console.log(`[productController:addBookmark] productId:${productId}, userId:${userId}`)
        const data = await wishlistServices.postWislistItem(productId, userId)
        res.status(200).json({type: 'success', message:'Berhasil Menambahkan Wishlist'}) 
    } catch (error) {
        res.status(400).json({type: 'fail', message: 'Gagal Menambahkan Wishlist'})
    }
}

const wishlistServices = require('../services/wishlistServices.cjs')

exports.getWishlist = async(req, res)=> {
    try {
        const userId = req.user.id
        const data = await wishlistServices.getWishlists(userId)
        res.status(200).json({type: 'success', data, message:'Berhasil Mendapatkan Wishlist'}) 
    } catch (error) {
        res.status(400).json({type: 'fail', message: 'failed to get data'})
    }
}
exports.addWishlist = async(req, res)=> {
    try {
        const productId = req.body
        const userId = req.user.id
        const isClaimed = await wishlistServices.checkWishlistItem(productId, userId)
        if(isClaimed){
            return res.status(409).json({type: 'fail', message: 'Produk Sudah Ada di Wishlist'})
        }
        await wishlistServices.postWislistItem(productId, userId)
        res.status(201).json({type: 'success', message:'Berhasil Menambahkan Wishlist'}) 
    } catch (error) {
        res.status(400).json({type: 'fail', message: 'Gagal Menambahkan Wishlist'})
    }
}
exports.removeWishlist = async(req, res)=> {
    try {
        const productId = req.body
        const userId = req.user.id
        await wishlistServices.deleteWishlistItem(productId, userId)
        res.status(200).json({type: 'success', message:'Berhasil Menghapus Wishlist'})
    } catch (error) {
        res.status(400).json({type: 'fail', message: 'Gagal Menghapus Wishlist'})
    }
}
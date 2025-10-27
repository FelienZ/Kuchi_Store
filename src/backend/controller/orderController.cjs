exports.makeOrder = async(req, res)=>{
    try {
        const productId = req.body
        const userId = req.user.id
        console.log('[orderController]: Tes')
        res.status(201).json({type:'success', message: 'success post order'})
    } catch (error) {
        res.status(400).json({type: 'fail', message: 'failed post Order'})
    }
}
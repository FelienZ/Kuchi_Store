const supabase = require('./supabase/supabaseClient.cjs')

async function verifyOrderItems(orderData) {
    const {id, price, qty} = orderData
    if(qty <= 0) throw new Error('Order Tidak Valid')
    const {data, error} = await supabase.from('products').select('stock, price').eq('id', id)
    if(error) throw new Error(`[OrderServices::verify]:${error}`)
    if(!data || !data[0]) throw new Error('Produk tidak ditemukan')
    const product = data[0]
    if(product.stock < qty) throw new Error('Stock Produk Tidak Valid')
    if(product.price * qty !== price) throw new Error('Order Tidak Valid')
    return product;
}
async function checkMatchOrder(userId, orderData) {
    const {id} = orderData
    const {data} = await supabase.from('orders').select('id, qty').eq('product_id', id).eq('user_id', userId)
    return data[0]
}
async function postOrder(userId, orderData) {
    const product = await verifyOrderItems(orderData)
    const matchOrder = await checkMatchOrder(userId, orderData)
    const {id, price, qty} = orderData
    if(matchOrder){
        //update orderQty -> update Stock
        const newQty = matchOrder.qty + qty
        const newPrice = newQty * price
        const {error: qtyError} = await supabase.from('orders').update({qty: newQty, total_price: newPrice}).eq('id', matchOrder.id)
        const newStock = product.stock - qty
        const {error: stockError} = await supabase.from('products').update({stock: newStock}).eq('id', id)
        if(stockError) throw new Error(`[OrderServices::post, updatestock]: ${error}`)
        if(qtyError) throw new Error(`[OrderServices::post, updateqty]: ${error}`)
        return
    }
    const {data, error} = await supabase.from('orders').insert([{user_id: userId, product_id: id, qty: qty, total_price: price}]).select('*')
    if(error) throw new Error(`[OrderServices::post]: ${error}`)
    if(data){
        //update Stock
        const newStock = product.stock - qty
        const {error: stockError} = await supabase.from('products').update({stock: newStock}).eq('id', id)
        if(stockError) throw new Error(`[OrderServices::post, updatestock]: ${error}`)
    }
}
async function getAllOrder(userId) {
    const { data, error } = await supabase.from('orders').select('*, product: products(*)').eq('user_id', userId)
    if(error) throw new Error(`[OrderServices::get]: ${error}`)
    return data
}
async function deleteOrder(userId, orderId) {
    const {error} = await supabase.from('orders').delete('*').eq('user_id', userId).eq('id', orderId)
    if(error) throw new Error(`[OrderServices::delete]: ${error}`)
}
module.exports ={postOrder, getAllOrder, deleteOrder}
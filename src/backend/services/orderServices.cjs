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

async function postOrder(userId, orderData) {
    const product = await verifyOrderItems(orderData)
    const {id, price, qty} = orderData
    const {data, error} = await supabase.from('orders').insert([{user_id: userId, product_id: id, qty: qty, total_price: price}]).select('*')
    if(error) throw new Error(`[OrderServices::post]: ${error}`)
    if(data){
        const newStock = product.stock - qty
        const {error: stockError} = await supabase.from('products').update({stock: newStock}).eq('id', id)
        if(stockError) throw new Error(`[OrderServices::post, updatestock]: ${error}`)
    }
}
async function getAllOrder(userId) {
    const { data, error } = await supabase.from('orders').select('*, product: products(id, name, url, price)').eq('user_id', userId)
    if(error) throw new Error(`[OrderServices::get]: ${error}`)
    return data
}
module.exports ={postOrder, getAllOrder}
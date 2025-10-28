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
    // console.log('Berhasil insert ', data)
    if(error) throw new Error(`[OrderServices::post]: ${error}`)
    if(data){
        const newStock = product.stock - qty
        // console.log('cek newStock: ', newStock)
        const {error: stockError} = await supabase.from('products').update({stock: newStock}).eq('id', id)
        // console.log('berhasil update stock')
        if(stockError) throw new Error(`[OrderServices::post, updatestock]: ${error}`)
    }
}

module.exports ={postOrder}
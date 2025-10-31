const supabase = require('./supabase/supabaseClient.cjs')

async function getProducts() {
    const { data, error } = await supabase.from('products').select('*').order('name')
    if(error) throw error
    return data;
}

async function getProductsbyId(id) {
    const {data, error} = await supabase.from('products').select('*').eq('id', id).single()
    if(!data || !data[0]) throw new Error('Produk Tidak Ditemukan')
    if(error) throw new Error(`[ProductServices::get{id}]: ${error}`)
    return data[0]
}

module.exports = {getProducts, getProductsbyId}
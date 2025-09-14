const supabase = require('./supabase/supabaseClient.cjs')

async function getProducts() {
    const { data, error } = await supabase.from('products').select('*').order('name')
    if(error) throw error
    return data;
}

module.exports = {getProducts}
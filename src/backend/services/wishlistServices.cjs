const supabase = require("./supabase/supabaseClient.cjs")

async function getWishlists(userId) {
    const { data, error } = await supabase.from('wishlists').select('*').eq('user_id', userId)
    if(error){
        throw new Error(`[WishlistServices::get] Error: ${error}`)
    }
    return data
}

async function checkWishlistItem(productId, userId) {
    const { data, error } = await supabase.from('wishlists').select('id').eq('user_id', userId).eq('product_id', productId)
    if(error){
        throw new Error(`[WishlistServices::check] Error: ${error}`)
    }
    return data && data.length > 0 //return true/falsy
}

async function postWislistItem(productId, userId) {
    const { data, error } = await supabase.from('wishlists').insert([{product_id: productId, user_id: userId}])
    if(error){
        throw new Error(`[WishlistServices::post] Error: ${error}`)
    }
    return data
}

async function deleteWishlistItem(productId, userId) {
   const { error } = await supabase.from('wishlists').delete('*').eq('user_id', userId).eq('product_id', productId)
    if(error){
        throw new Error(`[WishlistServices::delete] Error: ${error}`)
    }
}

module.exports = {checkWishlistItem, postWislistItem, getWishlists, deleteWishlistItem}
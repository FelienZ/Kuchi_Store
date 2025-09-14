const supabase = require('./supabase/supabaseClient.cjs')

async function addRefreshToken(token) {
    const { error } = await supabase.from('authentications').insert([{token}])
    if(error) throw new Error('Gagal Menyimpan Refresh Token')
}

async function verifyRefreshToken(token) {
    const { data, error } = await supabase.from('authentications').select('token').eq('token', token).single();
    if(error || !data) throw new Error('Token tidak Valid!')
}

async function deleteRefreshToken(token) {
    const { error } = await supabase.from('authentications').delete().eq('token', token)
    if(error) throw new Error('Gagal Hapus token')
}

module.exports ={
    addRefreshToken, verifyRefreshToken, deleteRefreshToken
}
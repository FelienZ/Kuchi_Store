const supabase = require('./supabase/supabaseClient.cjs')
const bcrypt = require('bcrypt')
async function addRefreshToken(token) {
    const { error } = await supabase.from('authentications').insert([{token}])
    if(error) throw new Error('Gagal Menyimpan Refresh Token')
}

async function verifyRefreshToken(token) {
    const { data, error } = await supabase.from('authentications').select('token').eq('token', token).single();
    if(error || !data) throw new Error('Token tidak Valid!')
}

async function verifyUserCredentials(email, password) {
    const { data, error } = await supabase.from('users').select('id, email, password').eq('email', email).single()
    if(error) throw new Error('Kredensial tidak Valid')
    const {id, password: hashedPassword} = data
    const matchData = await bcrypt.compare(password, hashedPassword)
    if(!matchData) throw new Error('Kredensial Tidak Valid')
    return id;
}

async function deleteRefreshToken(token) {
    const { error } = await supabase.from('authentications').delete().eq('token', token)
    if(error) throw new Error('Gagal Hapus token')
}

module.exports ={
    addRefreshToken, verifyRefreshToken, deleteRefreshToken, verifyUserCredentials
}
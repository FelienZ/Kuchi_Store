const supabase = require('./supabase/supabaseClient.cjs')
const bcrypt = require('bcrypt')

async function verifyNewUser(email) {
    const {data} = await supabase.from('users').select('email').eq('email', email).single()
    if(data){
        throw new Error('Gagal Menambahkan User, email yang sama telah digunakan')
    }
}

async function addUser({username, email, password}) {
    await verifyNewUser(email)
    const hashedPassword = await bcrypt.hash(password, 10);
    const { data, error } = await supabase.from('users').insert([{username, email, password: hashedPassword}])
    if(error) throw new Error('Gagal Menyimpan User')
    return data;
}

async function getUserById(userId) {
    const { data } = await supabase.from('users').select('id, username, email, detail').eq('id', userId).single()
    if(!data){
        throw new Error('User Tidak Ditemukan')
    }
    return data;
}

async function updateUserProfile(userId, newData) {
    const { data, error } = await supabase.from('users').update({detail: newData}).eq('id', userId).select()
    if(error){
        throw new Error('Gagal Memperbarui Profile')
    }
    return data
}

async function updateUserAccount(newData) {
    const {email, oldpassword, newPassword, confirmPassword} = newData
    const userData = await verifyNewUser(email, oldpassword) // return id?

}

module.exports = {
    addUser, verifyNewUser, getUserById, updateUserProfile, updateUserAccount
}
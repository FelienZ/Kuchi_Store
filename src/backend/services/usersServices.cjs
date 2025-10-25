const supabase = require('./supabase/supabaseClient.cjs')
const bcrypt = require('bcrypt')

async function verifyNewUser(email) {
    const {count, error} = await supabase.from('users').select('email', {count: 'exact', head: true}).eq('email', email)
    if(error){
        console.log('masuk reg Error')
        throw new Error('Gagal Menambahkan User, Terjadi Kesalahan Server')
    }
    if(count > 0){
        console.log('masuk reg duplicate')
        throw new Error('Gagal Menambahkan User, Email telah digunakan')
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

async function updateUserAccount(userId, newData) {
    const {email, oldpassword, newPassword, username, confirmPassword} = newData
    if(newPassword !== confirmPassword){
        throw new Error('Password Baru tidak cocok')
    }
    // console.log('[userServices] newData: ', newData)
    const currentPassword = await supabase.from('users').select('password').eq('id', userId)
    const macthPassword = await bcrypt.compare(oldpassword, currentPassword.data[0].password)
    // console.log('apakah pw lama valid? ', macthPassword)
    if(!macthPassword){
        throw new Error('Password Lama tidak valid')
    }
    const updatePassword = await bcrypt.hash(newPassword, 10)
    const{ data, error } = await supabase.from('users').update({email: email, username: username, password: updatePassword}).eq('id', userId).select()
    return data
}

module.exports = {
    addUser, verifyNewUser, getUserById, updateUserProfile, updateUserAccount
}
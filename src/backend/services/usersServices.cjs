const supabase = require('./supabase/supabaseClient.cjs')
const bcrypt = require('bcrypt')

async function addUser({username, email, password}) {
    await verifyNewUser(email)
    const hashedPassword = await bcrypt.hash(password, 10);
    const { data, error } = await supabase.from('users').insert([{username, email, password: hashedPassword}])
    if(error) throw new Error('Gagal Menyimpan User')
    return data;
}

async function verifyNewUser(email) {
    const data = await supabase.from('users').select('email').eq('email', email).maybeSingle()
    if(data){
        throw new Error('Gagal Menambahkan User, email yang sama telah digunakan')
    }
}

async function verifyUserCredentials(email, password) {
    const { data, error } = await supabase.from('users').select('id, password').eq('email', email).single()
    if(error) throw new Error('Kredensial tidak Valid')
    const {id, password: hashedPassword} = data
    const matchData = await bcrypt.compare(password, hashedPassword)
    if(!matchData) throw new Error('Kredensial Tidak Valid')
    return id;
}

module.exports = {
    addUser, verifyNewUser, verifyUserCredentials
}
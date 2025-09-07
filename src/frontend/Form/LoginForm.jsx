import { useState } from "react"

export default function Login({istriggered, sendLogin, sendClose}){
    const data = {
        email: '',
        password: ''
    }
    const [account, setAccount] = useState(data)
    function handleSendLogin(e){
        e.preventDefault();
        // sendLogin(account)
        handleClose()
        setAccount({email: '', password: ''})
    }
    function handleClose(){
        istriggered === true ? sendClose(false) : ''
    }
    return(
        <section className={`fixed z-40 backdrop-blur-sm inset-0 bg-black/20 justify-center items-center ${istriggered ? 'flex': 'hidden'}`}>
            <form action="" onSubmit={handleSendLogin} className="bg-white max-sm:w-[80%] w-[50%] lg:w-[35%] flex flex-col gap-3 p-5 items-center justify-center rounded-sm">
                <p className="font-bold text-xl">Login</p>
                <div className="name flex flex-col w-full">
                    <p>Your Email</p>
                    <input type="email" value={account.email} onChange={e=> setAccount({...account, email:e.target.value })} placeholder="email@example.com" className="input w-full bg-transparent border border-neutral-500"/>
                </div>
                <div className="name flex flex-col w-full">
                    <p>Password</p>
                    <input type="password" value={account.password} onChange={e=> setAccount({...account, password: e.target.value})} placeholder="Enter Your Password" className="input w-full bg-transparent border border-neutral-500"/>
                </div>
                <div className="addition text-sm flex items-center w-full justify-between">
                    <p className="hover:cursor-pointer text-left">Lupa Password?</p>
                    <p className="hover:cursor-pointer text-right">Belum Memiliki Akun?</p>
                </div>
                <button className="btn btn-neutral w-full">Login</button>
            </form>
        </section>
    )
}
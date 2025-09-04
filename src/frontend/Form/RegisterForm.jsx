import { useState } from "react"

export default function Register({istriggered, sendRegister, sendClose}){
    const data = {
        email: '',
        password: '',
        confirmPassword: ''
    }
    const [account, setAccount] = useState(data)
    function handleSendRegister(e){
        e.preventDefault();
        /* if(account.password.trim().toLowerCase() === account.confirmPassword.trim().toLowerCase()){
            sendRegister(account)
        } */
        handleClose()
        setAccount({email: '', password: '', confirmPassword: ''})
    }
    function handleClose(){
        istriggered === true ? sendClose(false) : ''
    }
    return(
        <section className={`${istriggered === true ? 'flex' : 'hidden'} fixed z-40 backdrop-blur-sm inset-0 bg-black/20 justify-center items-center`}>
            <form action="" onSubmit={handleSendRegister} className="bg-white w-[25%] flex flex-col gap-3 p-5 items-center justify-center rounded-sm">
                <p className="font-bold text-xl">Register Account</p>
                <div className="name flex flex-col w-full">
                    <p>Your Email</p>
                    <input type="email" value={account.email} onChange={e=> setAccount({...account, email:e.target.value })} placeholder="email@example.com" className="input w-full bg-transparent border border-neutral-500"/>
                </div>
                <div className="name flex flex-col w-full">
                    <p>Password</p>
                    <input type="password" value={account.password} onChange={e=> setAccount({...account, password: e.target.value})} placeholder="Make Password" className="input w-full bg-transparent border border-neutral-500"/>
                </div>
                <div className="name flex flex-col w-full">
                    <p>Confirm Password</p>
                    <input type="password" value={account.confirmPassword} onChange={e=> setAccount({...account, confirmPassword: e.target.value})} placeholder="Enter Confirm Password" className="input w-full bg-transparent border border-neutral-500"/>
                </div>
                <button className="btn btn-neutral w-full">Login</button>
            </form>
        </section>
    )
}
import { useContext, useRef, useState } from "react"
import { ProductReducerContext } from "../../storeContext";
import ClickedOutside from "../../hooks/Effect/clickedOutside";
import AttemptRegister from "../../hooks/Effect/attemptRegister";

export default function Register({istriggered, sendClose, sendTriggerLogin}){
    const data = {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    }
    const dispatch = useContext(ProductReducerContext)
    const [account, setAccount] = useState(data)
    const modalRef = useRef();

    ClickedOutside({modalRef, handleClose: sendClose})

    function HandleRegister(payload){
        AttemptRegister({payload, dispatch})
    }
    function checkRegister(e){
        e.preventDefault();
        if(account.username.trim() === '' || account.email.trim() === '' || account.password.trim() === '' || account.confirmPassword.trim() === ''){
            dispatch({
                type: 'SET_STATUS',
                status:'invalid_auth'
            })
            return
        }
        if(account.password.trim().toLowerCase() === account.confirmPassword.trim().toLowerCase()){
            HandleRegister({username: account.username, email: account.email, password: account.password})
        }
        else{
            dispatch({
                type: 'SET_STATUS',
                status: 'unmatch_data'
            })
            return
        }
        handleClose()
        setAccount({username: '',email: '', password: '', confirmPassword: ''})
    }
    function handleClose(){
        istriggered === true ? sendClose(false) : ''
    }
    return(
        <section className={`${istriggered === true ? 'flex' : 'hidden'} fixed z-40 backdrop-blur-sm inset-0 bg-black/20 justify-center items-center`}>
            <form ref={modalRef} onSubmit={checkRegister} className="bg-white max-sm:w-[80%] w-[50%] lg:w-[35%] flex flex-col gap-3 p-5 items-center justify-center rounded-sm">
                <p className="font-bold text-xl">Register Account</p>
                <div className="name flex flex-col w-full">
                    <p>Your Name</p>
                    <input type="text" value={account.name} onChange={e=> setAccount({...account, username:e.target.value })} placeholder="Enter Your Name" className="input w-full bg-transparent border border-neutral-500"/>
                </div>
                <div className="email flex flex-col w-full">
                    <p>Your Email</p>
                    <input type="email" value={account.email} onChange={e=> setAccount({...account, email:e.target.value })} placeholder="email@example.com" className="input w-full bg-transparent border border-neutral-500"/>
                </div>
                <div className="password flex flex-col w-full">
                    <p>Password</p>
                    <input type="password" value={account.password} onChange={e=> setAccount({...account, password: e.target.value})} placeholder="Create Password" className="input w-full bg-transparent border border-neutral-500"/>
                </div>
                <div className="confirm flex flex-col w-full">
                    <p>Confirm Password</p>
                    <input type="password" value={account.confirmPassword} onChange={e=> setAccount({...account, confirmPassword: e.target.value})} placeholder="Enter Confirm Password" className="input w-full bg-transparent border border-neutral-500"/>
                </div>
                <div className="addition flex items-center text-sm w-full justify-end">
                    <p onClick={sendTriggerLogin} className="hover:cursor-pointer text-right">Sudah Memiliki Akun?</p>
                </div>
                <button className="btn btn-neutral w-full">Register Now</button>
            </form>
        </section>
    )
}
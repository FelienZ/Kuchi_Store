import { useContext, useRef, useState } from "react"
import { ProductReducerContext } from "../../storeContext"
import ClickedOutside from "../../hooks/Effect/clickedOutside"
import AttemptLogin from "../../hooks/Effect/attemptLogin"
import { UserContext } from "../../userContext"

export default function Login({istriggered, sendClose, sendTriggerRegister}){
    const data = {
        email: '',
        password: ''
    }
    const {setUser} = useContext(UserContext)
    const modalRef = useRef()
    const dispatch = useContext(ProductReducerContext)
    const [isLoading, setIsLoading] = useState(false)
    const [account, setAccount] = useState(data)
    ClickedOutside({modalRef, handleClose: sendClose})

    function handleClose(){
        istriggered === true ? sendClose(false) : ''
    }

    function handleLogin(e) {
        e.preventDefault()
        AttemptLogin({setIsLoading, handleClose, account, setUser, dispatch, setAccount})
    }

    return(
        <section className={`fixed z-40 backdrop-blur-sm inset-0 bg-black/20 justify-center items-center ${istriggered ? 'flex': 'hidden'}`}>
            <form ref={modalRef} action="" onSubmit={handleLogin} className="bg-white max-sm:w-[80%] w-[50%] lg:w-[35%] flex flex-col gap-3 p-5 items-center justify-center rounded-sm">
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
                    <p onClick={sendTriggerRegister} className="hover:cursor-pointer text-right">Belum Memiliki Akun?</p>
                </div>
                <button type="submit" className={`btn btn-neutral w-full ${isLoading ? 'cursor-not-allowed text-neutral opacity-80' : ''}`} disabled={isLoading}> {isLoading ? <>Loading.. <span className="loading loading-spinner loading-sm text-info"></span></>: 'Login'}</button>
            </form>
        </section>
    )
}
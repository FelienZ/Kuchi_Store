import { useContext, useEffect, useRef, useState } from "react"
import { ProductReducerContext } from "../../storeContext"

export default function Login({istriggered, sendClose}){
    const data = {
        email: '',
        password: ''
    }
    const modalRef = useRef()
    const dispatch = useContext(ProductReducerContext)
    const [isLoading, setIsLoading] = useState(false)
    const [account, setAccount] = useState(data)
    useEffect(()=> {
        function handleClickOutside(event){
            if(modalRef.current && !modalRef.current.contains(event.target)){
                handleClose()
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return()=> document.removeEventListener('mousedown', handleClickOutside)
    })
    async function HandleLogin(e){
        e.preventDefault();
        setIsLoading(true)
        if(account.email.trim() === '' || account.password.trim() === ''){
            dispatch({
                type: 'SET_STATUS',
                status:'invalid_login'
            })
            setIsLoading(false)
            handleClose()
            return
        }
        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(account)
            })
            const result = await response.json();
            // console.log('cek hasil: ', result)
            if(result.status.trim() === 'success'){
                const user = result.data.user
                setIsLoading(false)
                localStorage.setItem('user_data', JSON.stringify(user))
                localStorage.setItem('access_token', JSON.stringify(result.data.accesstoken))
                dispatch({
                    type:'SET_USER',
                    data: user,
                    status: 'success_login'
                })
            }else{
                dispatch({
                    type:'SET_STATUS',
                    status:'invalid_login'
                })
            }
        } catch (error) {
            dispatch({
                    type:'SET_STATUS',
                    status:'invalid_login'
                })
        }
        finally{
        setIsLoading(false)
        handleClose()
        setAccount({email: '', password: ''})    
        }
        
    }
    function handleClose(){
        istriggered === true ? sendClose(false) : ''
    }
    return(
        <section className={`fixed z-40 backdrop-blur-sm inset-0 bg-black/20 justify-center items-center ${istriggered ? 'flex': 'hidden'}`}>
            <form ref={modalRef} action="" onSubmit={HandleLogin} className="bg-white max-sm:w-[80%] w-[50%] lg:w-[35%] flex flex-col gap-3 p-5 items-center justify-center rounded-sm">
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
                <button type="submit" className={`btn btn-neutral w-full ${isLoading ? 'cursor-not-allowed text-neutral opacity-80' : ''}`} disabled={isLoading}> {isLoading ? <>Loading.. <span className="loading loading-spinner loading-sm text-info"></span></>: 'Login'}</button>
            </form>
        </section>
    )
}
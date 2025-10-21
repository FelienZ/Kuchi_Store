import { useContext, useRef, useState } from "react"
import ClickedOutside from "../../hooks/Effect/clickedOutside"
import { UserContext } from "../../storeContext"

export default function EditAccount({sendClose}){
    const modalRef = useRef()
    const {user} = useContext(UserContext)
    const [userAccount, setUserAccount] = useState({
            email: user.email,
            oldpassword: '',
            newPassword: '',
            confirmPassword: ''
        })
    const [isActive, setIsActive] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    /* function handleClose(){
        istriggered === true ? sendClose(false) : ''
    } */
   async function sendEditAccount(e) {
        e.preventDefault();
        const response = await fetch('http://localhost:3000/api/users/')
   }
    ClickedOutside({modalRef, handleClose: sendClose})
    return(
        <section className={`${isActive? 'flex' : 'hidden'} bg-black/20 inset-0 backdrop-blur-lg fixed justify-center items-center z-40`}>
            <form ref={modalRef} action="" className="bg-white max-sm:w-[80%] w-[50%] lg:w-[35%] flex flex-col gap-3 p-5 items-center justify-center rounded-sm">
                <p className="font-bold text-xl">EDIT ACCOUNT</p>
                <div className="flex flex-col gap-2 w-full">
                    <p className="text-sm">Email: </p>
                    <input type="text" className="input border border-neutral w-full bg-white" defaultValue={userAccount.email} placeholder="Masukkan Data Baru" onChange={(e)=> setUserAccount({...userAccount, email: e.target.value})}/>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <p className="text-sm">Old Password: </p>
                    <input type="text" className="input border border-neutral w-full bg-white" defaultValue={userAccount.oldpassword} placeholder="Masukkan Data Baru" onChange={(e)=> setUserAccount({...userAccount, oldpassword: e.target.value})}/>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <p className="text-sm">New Password: </p>
                    <input type="text" className="input border border-neutral w-full bg-white" defaultValue={userAccount.newPassword} placeholder="Masukkan Data Baru" onChange={(e)=> setUserAccount({...userAccount, newPassword: e.target.value })}/>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <p className="text-sm">Confirm New Password: </p>
                    <input type="text" className="input border border-neutral w-full bg-white" defaultValue={userAccount.gender} placeholder="Masukkan Data Baru" onChange={(e)=> setUserAccount({...userAccount, confirmPassword: e.target.value})}/>
                </div>
                <button className="btn btn-neutral w-full">Save {isLoading ? (<span className="loading loading-spinner text-primary"></span>) : ''}</button>
            </form>
        </section>
    )
}
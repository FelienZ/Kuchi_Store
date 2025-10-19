import { useContext, useRef, useState } from "react"
import ClickedOutside from "../../hooks/Effect/clickedOutside"
import { UserContext } from "../../storeContext"

export default function EditAccount({sendClose}){
    const modalRef = useRef()
    const {user} = useContext(UserContext)
    const [userAccount, setUserAccount] = useState({
            email: user.email,
            oldpassword: '',
            newPassword: ''
        })
    /* function handleClose(){
        istriggered === true ? sendClose(false) : ''
    } */
    ClickedOutside({modalRef, handleClose: sendClose})
    return(
        <section className={`flex bg-black/20 inset-0 backdrop-blur-lg fixed justify-center items-center z-40`}>
            <form ref={modalRef} action="" className="bg-white max-sm:w-[80%] w-[50%] lg:w-[35%] flex flex-col gap-3 p-5 items-center justify-center rounded-sm">
                <p className="font-bold text-xl">EDIT ACCOUNT</p>
            </form>
        </section>
    )
}
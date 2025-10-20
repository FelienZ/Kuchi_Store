import { useContext, useRef, useState } from "react"
import ClickedOutside from "../../hooks/Effect/clickedOutside"
import { UserContext } from "../../storeContext"

export default function EditProfile({sendClose}){
    const modalRef = useRef()
    const {user} = useContext(UserContext)
    const [userProfile, setUserProfile] = useState({
        username: user.username,
        organization: user.detail?.organization??'',
        address: user.detail?.organization??'',
        gender: user.detail?.gender??''
    })
    // console.log('cek profile: ', userProfile)
    async function sendEdit(e){
        e.preventDefault()
        const response = await fetch('http://localhost:3000/api/users/edit', {
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify(userProfile),
            headers: {'Content-Type' : 'application/json'}
        })
        const result = await response.json()
        console.log('cek: ', result)
    }
    ClickedOutside({modalRef, handleClose: sendClose})
    return(
        <section className={`flex bg-black/20 inset-0 backdrop-blur-lg fixed justify-center items-center z-40`}>
            <form onSubmit={sendEdit} ref={modalRef} action="" className="bg-white max-sm:w-[80%] w-[50%] lg:w-[35%] flex flex-col gap-3 p-5 items-center justify-center rounded-sm">
                <p className="font-bold text-xl">EDIT PROFILE</p>
                <div className="flex flex-col gap-2 w-full">
                    <p className="text-sm">Username: </p>
                    <input type="text" className="input border border-neutral w-full bg-white" defaultValue={userProfile.username} placeholder="Masukkan Data Baru" onChange={(e)=> setUserProfile({...userProfile, username: e.target.value})}/>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <p className="text-sm">Organization: </p>
                    <input type="text" className="input border border-neutral w-full bg-white" defaultValue={userProfile.organization} placeholder="Masukkan Data Baru" onChange={(e)=> setUserProfile({...userProfile, organization: e.target.value})}/>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <p className="text-sm">address: </p>
                    <input type="text" className="input border border-neutral w-full bg-white" defaultValue={userProfile.address} placeholder="Masukkan Data Baru" onChange={(e)=> setUserProfile({...userProfile, address: e.target.value })}/>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <p className="text-sm">gender: </p>
                    <input type="text" className="input border border-neutral w-full bg-white" defaultValue={userProfile.gender} placeholder="Masukkan Data Baru" onChange={(e)=> setUserProfile({...userProfile, gender: e.target.value})}/>
                </div>
                <button type="submit" className="btn btn-neutral w-full">Save</button>
            </form>
        </section>
    )
}
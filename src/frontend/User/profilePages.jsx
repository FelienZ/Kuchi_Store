import { useContext, useState } from "react"
import { UserContext } from "../../storeContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBuilding, faEdit, faKey } from "@fortawesome/free-solid-svg-icons"
import EditProfile from "../Form/EditProfile"
import EditAccount from "../Form/EditAccount"

export default function ProfilePages(){
    const {user} = useContext(UserContext)
    // console.log('cek user: ', user)
    const [triggerProfile, setTriggerProfile] = useState(false)
    const [triggerAccount, setTriggerAccount] = useState(false)
    function handleCloseProfile(value){
        setTriggerProfile(value)
    }
    function handleCloseAccount(value){
        setTriggerAccount(value)
    }
    // console.log(user)
    return(
        <section className="min-h-screen p-5 md:w-[90%] place-self-center">
            {triggerProfile ? (
                <EditProfile sendClose={handleCloseProfile}/>
            ): ''}
            {triggerAccount ? (
                <EditAccount sendClose={handleCloseAccount}/>
            ): ''}
            <div className="top md:divide-x max-md:divide-y text-neutral/60 rounded-sm bg-white p-3 drop-shadow-sm max-md:flex max-md:flex-col items-center md:grid md:grid-cols-[auto_1fr_1fr] gap-3">
                <div className="avatar p-3 w-full justify-center">
                    <div className="w-50 rounded-full bg-white drop-shadow-sm">
                        <img src="pp.png" />
                    </div>
                </div>
                <div className="flex flex-col justify-evenly h-full p-3">
                    <p className="font-bold text-2xl">{user.username.toUpperCase()}</p>
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-sm">
                            <FontAwesomeIcon icon={faBuilding}/>
                            <p>{user.detail?.organization?? 'Kuchi Store'}</p>
                        </div>
                        <p>{user.detail?.occupation?? 'Customer'}</p>
                    </div>
                    <div className="action max-lg:grid max-lg:grid-cols-2 flex items-center gap-2 self-end">
                        <button className="btn btn-neutral" onClick={()=>setTriggerProfile(true)}><FontAwesomeIcon icon={faEdit}/> Edit Profile</button>
                        <button className="btn btn-neutral" onClick={()=>setTriggerAccount(true)}><FontAwesomeIcon icon={faKey}/> Edit Account</button>
                    </div>
                </div>
                <div className="overflow-x-auto h-full">
                    <table className="table">
                        <tbody>
                            <tr>
                            <td className="font-bold">Address : </td>
                            <td>{user.detail?.address?? 'No Information'}</td>
                        </tr>
                        <tr>
                            <td className="font-bold">Email : </td>
                            <td>{user.email}</td>
                        </tr>
                        <tr>
                            <td className="font-bold">Gender : </td>
                            <td>{user.detail?.gender?? 'No Information'}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}
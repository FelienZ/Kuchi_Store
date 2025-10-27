import { useContext, useRef, useState } from "react"
import ClickedOutside from "../../hooks/clickedOutside"
import { ProductReducerContext, UserContext } from "../../storeContext"
import attemptEditProfile from "../../utils/editProfile"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons"

export default function EditProfile({sendClose}){
  const modalRef = useRef()
  const {user, refetchUser} = useContext(UserContext)
  const dispatch = useContext(ProductReducerContext)
  const [userProfile, setUserProfile] = useState({
    organization: user.detail?.organization??'',
    address: user.detail?.address??'',
    gender: user.detail?.gender??'',
    github: user.detail?.github??'',
    linkedin: user.detail?.linkedin??'',
    instagram: user.detail?.instagram??''
  })
  const [isActive, setIsActive] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  // console.log('cek profile: ', userProfile)
  async function sendEditProfile(e){
    e.preventDefault()
    await attemptEditProfile({setIsActive, setIsLoading, refetchUser, dispatch, setUserProfile, userProfile})
    // console.log('cek: ', result)
  }
  ClickedOutside({modalRef, handleClose: sendClose})
  return(
        <section className={`${isActive ? 'flex' : 'hidden'} bg-black/20 inset-0 backdrop-blur-lg fixed justify-center items-center z-40`}>
            <form onSubmit={sendEditProfile} ref={modalRef} action="" className="bg-white max-sm:w-[80%] w-[50%] lg:w-[35%] flex flex-col gap-3 p-5 items-center justify-center rounded-sm">
                <p className="font-bold text-xl">EDIT PROFILE</p>
                <div className="flex flex-col gap-2 w-full">
                    <p className="text-sm">Organization: </p>
                    <input type="text" className="input border border-neutral w-full bg-white" defaultValue={userProfile.organization} placeholder="Masukkan Data Baru" onChange={(e)=> setUserProfile({...userProfile, organization: e.target.value})}/>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <p className="text-sm">Address: </p>
                    <input type="text" className="input border border-neutral w-full bg-white" defaultValue={userProfile.address} placeholder="Masukkan Data Baru" onChange={(e)=> setUserProfile({...userProfile, address: e.target.value })}/>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <p className="text-sm">Gender: </p>
                    <select className="select bg-transparent border text-neutral border-neutral w-full" defaultValue={userProfile.gender??'Your Gender'} onChange={(e)=> setUserProfile({...userProfile, gender: e.target.value})}>
                        <option value="Pria">Pria</option>
                        <option value="Wanita">Wanita</option>
                    </select>
                </div>
                <div className="grid grid-cols-3 gap-2">
                    <div className="flex flex-col gap-2">
                        <FontAwesomeIcon icon={faGithub} className="self-center text-xl"/>
                        <input type="text" className="input border border-neutral w-full bg-white" defaultValue={userProfile.github} placeholder="Masukkan Data Baru" onChange={(e)=> setUserProfile({...userProfile, github: e.target.value})}/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <FontAwesomeIcon icon={faLinkedin} className="self-center text-xl"/>
                        <input type="text" className="input border border-neutral w-full bg-white" defaultValue={userProfile.linkedin} placeholder="Masukkan Data Baru" onChange={(e)=> setUserProfile({...userProfile, linkedin: e.target.value})}/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <FontAwesomeIcon icon={faInstagram} className="self-center text-xl"/>
                        <input type="text" className="input border border-neutral w-full bg-white" defaultValue={userProfile.instagram} placeholder="Masukkan Data Baru" onChange={(e)=> setUserProfile({...userProfile, instagram: e.target.value})}/>
                    </div>
                </div>
                <button type="submit" className="btn btn-neutral w-full">Save {isLoading ? (<span className="loading loading-spinner text-primary"></span>) : ''}</button>
            </form>
        </section>
  )
}
import { useContext, useState } from "react"
import { UserContext } from "../../storeContext"
import ProfileCard from "./profileCard"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookmark, faComment, faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import { NavLink, Outlet } from "react-router"

export default function ProfilePages(){
  const {user} = useContext(UserContext)
  const [triggerProfile, setTriggerProfile] = useState(false)
  const [triggerAccount, setTriggerAccount] = useState(false)
  function handleCloseProfile(value){
    setTriggerProfile(value)
  }
  function handleCloseAccount(value){
    setTriggerAccount(value)
  }
  return(
        <section className="min-h-screen flex flex-col gap-4 p-5 md:w-[90%] place-self-center">
            <ProfileCard 
                triggerAccount={triggerAccount}
                triggerProfile={triggerProfile}
                handleCloseAccount={handleCloseAccount}
                handleCloseProfile={handleCloseProfile}
                setTriggerAccount={setTriggerAccount}
                setTriggerProfile={setTriggerProfile}
                user={user}
            />

          <div className="grid text-neutral/60 md:grid-cols-[0.3fr_1fr] gap-3">
              <div className="flex flex-col bg-white drop-shadow-sm rounded-sm p-4 gap-3 h-fit">
                  <p className="font-bold">Your Activity</p>
                  <div className="flex flex-col gap-2 text-sm p-2">
                      <NavLink className={({isActive}) => isActive ? 'text-lime-500' : ''} to={'wishlist'}><p className="flex items-center gap-2"><FontAwesomeIcon icon={faBookmark}/>Wishlist Barang</p></NavLink>
                      <NavLink className={({isActive}) => isActive ? 'text-lime-500' : ''} to={'history'}><p className="flex items-center gap-2"><FontAwesomeIcon icon={faShoppingCart}/>Riwayat Belanja</p></NavLink>
                      <NavLink className={({isActive}) => isActive ? 'text-lime-500' : ''} to={'comment'}><p className="flex items-center gap-2"><FontAwesomeIcon icon={faComment}/>Riwayat Komentar</p></NavLink>
                  </div>
              </div>
              <div className="bg-white drop-shadow-sm rounded-sm p-4">
                  <Outlet/>
              </div>
          </div>
        </section>
  )
}
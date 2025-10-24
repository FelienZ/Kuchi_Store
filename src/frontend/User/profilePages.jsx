import { useContext, useState } from "react"
import { UserContext } from "../../storeContext"
import ProfileCard from "./profileCard"

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
            <ProfileCard 
                triggerAccount={triggerAccount}
                triggerProfile={triggerProfile}
                handleCloseAccount={handleCloseAccount}
                handleCloseProfile={handleCloseProfile}
                setTriggerAccount={setTriggerAccount}
                setTriggerProfile={setTriggerProfile}
                user={user}
            />
        </section>
  )
}
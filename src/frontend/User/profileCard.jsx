import { faGithub, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faBuilding, faEdit, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditProfile from '../Form/EditProfile'
import EditAccount from '../Form/EditAccount'


export default function ProfileCard({triggerProfile, triggerAccount, handleCloseAccount, handleCloseProfile, user,setTriggerAccount, setTriggerProfile}){
  return(
      <div>
        {triggerProfile ? (
                <EditProfile sendClose={handleCloseProfile}/>
            ): ''}
            {triggerAccount ? (
                <EditAccount sendClose={handleCloseAccount}/>
            ): ''}
            <div className="top md:divide-x max-md:divide-y text-neutral/60 rounded-sm bg-white p-3 drop-shadow-sm max-md:flex max-md:flex-col items-center md:grid md:grid-cols-[auto_1fr_1fr] gap-3">
                <div className="avatar p-3 w-full justify-center">
                    <div className="w-50 rounded-full bg-white drop-shadow-sm">
                        <img src='/pp.png' />
                    </div>
                </div>
                <div className="flex flex-col justify-evenly h-full w-full p-3">
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
                        <tr>
                            <td className="font-bold">Socials   : </td>
                            <td className="flex items-center gap-4">
                                <a href={user.detail.github? `https://${user.detail.github}` : ''}><FontAwesomeIcon icon={faGithub} className={`text-2xl ${user.detail.github? 'hover:text-lime-500': ''}`}/></a>
                                <a href={user.detail.linkedin? `https://${user.detail.linkedin}` : ''}><FontAwesomeIcon icon={faLinkedin} className={`text-2xl ${user.detail.linkedin? 'hover:text-lime-500': ''}`}/></a>
                                <a href={user.detail.instagram? `https://${user.detail.instagram}` : ''}><FontAwesomeIcon icon={faInstagram} className={`text-2xl ${user.detail.instagram? 'hover:text-lime-500': ''}`}/></a>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
      </div>  
  )
}
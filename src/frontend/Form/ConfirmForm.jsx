import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useRef, useState } from "react";
import ClickedOutside from "../../hooks/clickedOutside";
import { ProductReducerContext, UserContext } from "../../storeContext";
import { AttemptLogout } from "../../utils/attemptLogout";

export default function ConfirmationForm({isTriggered, sendClose, actionData}){
  const modalRef = useRef()
  const dispatch = useContext(ProductReducerContext)
  const {setUser} = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(false)
  ClickedOutside({modalRef, handleClose:sendClose})
  async function handleAction(action){
    setIsLoading(true)
    switch(action.command.trim().toLowerCase()){
      case 'logout':
        await AttemptLogout({setUser, dispatch})
        break;
      case 'order':
        action.onConfirm? await action.onConfirm() : ''
        break;
    }
    setIsLoading(false)
    sendClose()
  }
  return(
        <section className={`fixed z-40 backdrop-blur-sm inset-0 bg-black/20 justify-center items-center ${isTriggered ? 'flex' : 'hidden'}`}>
            <form ref={modalRef} onSubmit={(e)=> e.preventDefault()} className="bg-white w-fit flex flex-col gap-3 p-5 px-8 items-center justify-between rounded-sm">
                <div className="self-center">
                    <div className="badge badge-warning rounded-full size-14">
                        <FontAwesomeIcon icon={faTriangleExclamation} className="text-3xl"/>
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="message flex flex-col gap-2 items-center">
                        <p className="font-bold">Konfirmasi Aksi</p>
                        <p className="text-sm">{actionData?.message??''}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 w-full">
                        <button onClick={()=>sendClose()} className="btn btn-outline btn-neutral">Cancel</button>
                        {isLoading ? (<div className="btn btn-neutral btn-outline"><span className="loading loading-spinner loading-sm text-info"></span></div>) : (<button onClick={()=>handleAction(actionData)} className="btn btn-neutral">Confirm</button>)}
                    </div>
                </div>
            </form>
        </section>
  )
}
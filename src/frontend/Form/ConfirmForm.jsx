import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useRef } from "react";
import ClickedOutside from "../../hooks/clickedOutside";
import { ProductReducerContext, UserContext } from "../../storeContext";
import { AttemptLogout } from "../../utils/attemptLogout";
import MakeOrder from "../../utils/makeOrder";

export default function ConfirmationForm({isTriggered, sendClose, actionData}){
  const modalRef = useRef()
  const dispatch = useContext(ProductReducerContext)
  const {setUser} = useContext(UserContext)
  ClickedOutside({modalRef, handleClose:sendClose})
  async function handleAction(action){
    //confirm checkout(next)?
    action.trim() === 'logout' ? await AttemptLogout({setUser, dispatch}) : ''
    sendClose()
  }
  return(
        <section className={`fixed z-40 backdrop-blur-sm inset-0 bg-black/20 justify-center items-center ${isTriggered ? 'flex' : 'hidden'}`}>
            <form ref={modalRef} onSubmit={(e)=> e.preventDefault()} className="bg-white w-fit flex flex-col gap-3 p-5 items-center justify-between rounded-sm">
                <div className="self-center">
                    <div className="badge badge-warning rounded-full size-14">
                        <FontAwesomeIcon icon={faTriangleExclamation} className="text-3xl"/>
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <p className="text-center font-bold">Konfirmasi?</p>
                    <div className="grid grid-cols-2 gap-2 w-full">
                        <button onClick={()=>sendClose()} className="btn btn-outline hover:bg-neutral">Cancel</button>
                        <button onClick={()=>handleAction(actionData)} className="btn btn-neutral">Confirm</button>
                    </div>
                </div>
            </form>
        </section>
  )
}
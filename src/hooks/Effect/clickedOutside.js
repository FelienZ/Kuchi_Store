import { useEffect } from "react"

export default function ClickedOutside({modalRef, handleClose}){
    useEffect(()=> {
        function handleClickOutside(event){
            if(modalRef.current && !modalRef.current.contains(event.target)){
                handleClose()
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return()=> document.removeEventListener('mousedown', handleClickOutside)
    })
}
import { useContext, useEffect } from "react"
import { ModalContext, UserContext } from "../storeContext"
import { Navigate, Outlet } from "react-router"

export default function ProtectedRoute(){
    const {user, isLoading} = useContext(UserContext)
    const {setTriggerLogin} = useContext(ModalContext)

    useEffect(()=> {
        if(!user && isLoading) setTriggerLogin(true)
    }, [user, isLoading, setTriggerLogin])

    if(!isLoading) return (
        <div className="flex justify-center items-center h-screen">
            <p>Loading...</p>
        </div>
    )

    return user ? <Outlet/> : <Navigate to={'/'}/>
}
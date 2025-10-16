import { useEffect } from "react"

export default function FetchUser({dispatch}){
    useEffect(()=>{
            const getUser = localStorage.getItem('user_data')
            if(getUser){
            dispatch({
                type: 'SET_USER',
                data: JSON.parse(getUser),
                status: ''
            })
            }
        }, [])
}
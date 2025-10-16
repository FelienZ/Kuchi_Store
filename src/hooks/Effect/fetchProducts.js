import { useEffect } from "react";

export default function FetchProducts({dispatch}){
    useEffect(()=> {
        async function FetchData() {
                try {
                    const response = await fetch('http://localhost:3000/api/products')
                    const result = await response.json();
                    if(result.type === 'success'){
                        dispatch({
                        type: 'GET_DATA',
                        payload: result.payload
                    })
                    return
                    }
                } catch (error) {
                    dispatch({
                        type: 'SET_STATUS',
                        status: 'fetch_fail'
                    })
                }
            }
            FetchData()
        },[])
}
import { useCallback } from "react";

export default function useFetchUser(setUser, setIsLoading) {
    return useCallback(async ()=> {
        setIsLoading(false)
        try {
            const response = await fetch('http://localhost:3000/api/users/me', { 
                credentials: 'include' 
            })
            const result = response.ok ?   await response.json() : await Promise.reject()
            // console.log('cek result: ', result)
            setUser(result.data)
        } catch (error) {
            setUser(null)
        }finally{
            setIsLoading(true)
        }
    }, [setUser, setIsLoading])
      //kalo basi -> null
}
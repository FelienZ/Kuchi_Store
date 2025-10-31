import { useCallback } from "react";
const baseUrl = import.meta.env.VITE_API_URL

export default function useFetchUser(setUser, setIsLoading) {
  return useCallback(async ()=> {
    setIsLoading(false)
    try {
      const response = await fetch(`${baseUrl}/api/users/me`, { 
        credentials: 'include' 
      })
      const result = response.ok ?   await response.json() : await Promise.reject()
      setUser(result.data)
    } catch (error) {
      setUser(null)
    }finally{
      setIsLoading(true)
    }
  }, [setUser, setIsLoading])
}
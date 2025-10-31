const baseUrl = import.meta.env.VITE_API_URL

export default async function GetOrder({setOrder, setIsLoading}){
  setIsLoading?.(true)
  try {
    const response = await fetch(`${baseUrl}/api/orders/getorder`, {
      credentials: 'include'
    }) 
    const result = await response.json()
    if(response.ok){
      setOrder(result.data)
    }
    setIsLoading?.(false)
  } catch (error) {
    console.error(`[GetOrder]: ${error.message}`)
  }
}
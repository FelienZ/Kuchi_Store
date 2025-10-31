export default async function GetOrder({setOrder, setIsLoading}){
  setIsLoading?.(true)
  try {
    const response = await fetch('http://localhost:3000/api/orders/getorder', {
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
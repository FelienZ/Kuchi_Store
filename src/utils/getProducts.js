export default async function getProducts({dispatch, setIsLoading}) {
  setIsLoading?.(true)
  try {
    const response = await fetch('http://localhost:3000/api/products')
    const result = await response.json();
    if(result.type === 'success'){
      setIsLoading?.(false)
      dispatch({
        type: 'GET_DATA',
        payload: result.payload
      })
      return
    }else{
      setIsLoading?.(false)
      dispatch({
        type: 'SET_STATUS',
        status: 'fetch_fail'
      })
    }
  } catch (error) {
    console.error(`[getProducts]: ${error.message}`)
  }
}
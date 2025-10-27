export default async function RemoveWishlist({id, dispatch, setIsLoading}){
  setIsLoading(true)
  try {
    const response = await fetch('http://localhost:3000/api/wishlists/deleteWishlist', {
      method: 'DELETE',
      credentials:'include',
      body: id,
    })  
    const result = await response.json()
    console.log('cek result: ', result)
    if(response.ok){
      setIsLoading(false)
      dispatch({
        type: 'SET_STATUS',
        status: 'success_updated'
      })
    }else{
      setIsLoading(false)
      dispatch({
        type: 'SET_STATUS',
        status: 'fail_updated'  
      })
    }
  } catch (error) {
    console.error(`[RemoveWishlist]: ${error.message}`)
  } finally{
    setIsLoading(false)
  }
}
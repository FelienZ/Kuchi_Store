export default async function RemoveWishlist({id, dispatch}){
  try {
    const response = await fetch('http://localhost:3000/api/wishlists/deleteWishlist', {
      method: 'DELETE',
      credentials:'include',
      body: id,
    })  
    await response.json()
    if(response.ok){
      dispatch({
        type: 'SET_STATUS',
        status: 'success_updated'
      })
    }else{
      dispatch({
        type: 'SET_STATUS',
        status: 'fail_updated'  
      })
    }
  } catch (error) {
    console.error(`[RemoveWishlist]: ${error.message}`)
  } 
}
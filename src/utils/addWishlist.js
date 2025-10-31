export default async function AddWishlist({user, dispatch, id}){
  if(!user){
    return dispatch({
      type: 'SET_STATUS',
      status:'not_loggedin',
    })
  }else{
    try {
      const response = await fetch('http://localhost:3000/api/wishlists/addwishlist', {
        method: 'POST',
        credentials: 'include',
        body: id,
        headers: {'Content-Type' : 'text/plain'}
      })
      const result = await response.json()
      if(result.type === 'success' || response.ok){
        dispatch({
          type: 'SET_STATUS',
          status: 'success_added'
        })
      }else{
        dispatch({
          type: 'SET_STATUS',
          status: 'fail_added',
          message: result.message
        })  
      }
    } catch (error) {
      console.error(`Kesalahan: ${error.message}`)
    }
  }
}
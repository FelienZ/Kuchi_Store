export default async function attemptEditAccount({userAccount, setUserAccount, refetchUser, dispatch, setIsLoading, setIsActive}){
  try {
    const response = await fetch('http://localhost:3000/api/users/editaccount', {
      credentials: 'include',
      method: 'PUT',
      body: JSON.stringify(userAccount),
      headers: {'Content-Type' : 'application/json'}
    })
    // console.log('is response ok? ', response.ok)
    const result = await response.json()
    // console.log('hasil update: ', result)
    if(response.ok){
      setUserAccount(result.data)
      refetchUser()
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
    console.error(`Error at Updating Account: ${error.message}`)
  } finally{
    setIsLoading(false)
    setIsActive(false)
  }
}
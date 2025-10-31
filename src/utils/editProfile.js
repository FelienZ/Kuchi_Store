export default async function attemptEditProfile({setIsActive, setIsLoading, dispatch, refetchUser, setUserProfile, userProfile}) {
  setIsLoading(true)
  const response = await fetch('http://localhost:3000/api/users/editprofile', {
    method: 'PUT',
    credentials: 'include',
    body: JSON.stringify(userProfile),
    headers: {'Content-Type' : 'application/json'}
  })
  try {
    const data = await response.json()
    // console.log('hasil fetch: ', data)
    if(response.ok){
      setUserProfile(data.newProfile)
      refetchUser()
      dispatch({
        type: 'SET_STATUS',
        status: 'success_updated'
      })
      setIsLoading(false)
      setIsActive(false)
    }
  } catch (error) {
    console.error(`[editProfile]: ${error.message}`)
  }
  finally{
    setIsLoading(false)
    setIsActive(false)
  }
}
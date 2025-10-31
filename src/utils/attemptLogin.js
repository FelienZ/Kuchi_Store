const baseUrl = import.meta.env.VITE_API_URL
export default async function AttemptLogin({setIsLoading, dispatch, account, handleClose, setUser, setAccount}){
  setIsLoading(true)
  if(account.email.trim() === '' || account.password.trim() === ''){
    dispatch({
      type: 'SET_STATUS',
      status:'invalid_login'
    })
    setIsLoading(false)
    handleClose()
    return
  }
  try {
    const response = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      credentials: 'include',
      body: JSON.stringify(account)
    })
    const result = await response.json();
    if(result.status.trim() === 'success'){
      const user = result.data.user
      setIsLoading(false)
      setUser(user)
      dispatch({
        type:'SET_USER',
        status: 'success_login'
      })
    }else{
      dispatch({
        type:'SET_STATUS',
        status:'invalid_login'
      })
    }
  } catch (error) {
    console.error(`Gagal dalam login: ${error.message}`)
  }
  finally{
    setIsLoading(false)
    handleClose()
    setAccount({email: '', password: ''})    
  }
}
const baseUrl = import.meta.env.VITE_API_URL

export default async function AttemptRegister({payload, dispatch, handleClose, setIsLoading}){
  setIsLoading(true)
  try {
    const response = await fetch(`${baseUrl}/api/auth/register`,{
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(payload)
    })
    const result = await response.json()
    if(result.status.trim() === 'success' || response.ok){
      setIsLoading(false)
      handleClose()
      dispatch({
        type:'SET_USER',
        data: result.data,
        status: 'success_register'
      })
    }else{
      dispatch({
        type:'SET_STATUS',
        status:'redundant_register',
        message: result.message
      })
    }
  } catch (error) {
    console.error(`Gagal dalam registrasi: ${error.message}`)
  }finally{
    setIsLoading(false)
    handleClose()
  }
}
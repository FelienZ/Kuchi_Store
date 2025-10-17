export default async function AttemptLogin({setIsLoading, dispatch, account, handleClose, setAccount}){
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
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(account)
            })
            const result = await response.json();
            // console.log('cek hasil: ', result)
            if(result.status.trim() === 'success'){
                const user = result.data.user
                setIsLoading(false)
                localStorage.setItem('user_data', JSON.stringify(user))
                localStorage.setItem('access_token', JSON.stringify(result.data.accessToken))
                dispatch({
                    type:'SET_USER',
                    data: user,
                    status: 'success_login'
                })
            }else{
                dispatch({
                    type:'SET_STATUS',
                    status:'invalid_login'
                })
            }
        } catch (error) {
            dispatch({
                    type:'SET_STATUS',
                    status:'invalid_login'
                })
        }
        finally{
        setIsLoading(false)
        handleClose()
        setAccount({email: '', password: ''})    
        }
}
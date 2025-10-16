export default async function AttemptRegister({payload, dispatch}){
    const response = await fetch('http://localhost:3000/api/auth/register',{
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(payload)
        })
        const result = await response.json()
        if(result.status.trim() === 'success'){
            dispatch({
                type:'SET_USER',
                data: result.data,
                status: 'success_register'
            })
            return
        }else{
            dispatch({
                type:'SET_STATUS',
                status:'invalid_register'
            })
            return
        }
}
export async function AttemptLogout({setUser, dispatch}) {
    const response = await fetch('http://localhost:3000/api/auth/logout',{
        method: 'DELETE',
        credentials: 'include'
    })
    const data = await response.json();
    console.log(data)
    setUser(null)
    dispatch({
        type: 'SET_USER',
        status: 'success_logout'
    })
}
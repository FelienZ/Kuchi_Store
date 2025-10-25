export async function AttemptLogout({setUser, dispatch}) {
  const response = await fetch('http://localhost:3000/api/auth/logout',{
    method: 'DELETE',
    credentials: 'include'
  })
  await response.json();
  setUser(null)
  dispatch({
    type: 'SET_USER',
    status: 'success_logout'
  })
}
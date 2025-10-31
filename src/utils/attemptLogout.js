const baseUrl = import.meta.env.VITE_API_URL

export async function AttemptLogout({setUser, dispatch}) {
  const response = await fetch(`${baseUrl}/api/auth/logout`,{
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
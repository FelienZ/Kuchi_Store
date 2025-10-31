const baseUrl = import.meta.env.VITE_API_URL

export default async function CancelOrder({id, fetchOrder, dispatch}){
  const response = await fetch(`${baseUrl}/api/orders/cancelorder`, {
    method: 'DELETE',
    body: id,
    credentials: 'include',
    headers:{'Content-Type': 'text/plain'}
  })
  if(response.ok){
    await response.json()
    fetchOrder()
    return dispatch({
      type: 'SET_STATUS',
      status: 'success_cancel'
    })
  }else{
    return dispatch({
      type: 'SET_STATUS',
      status: 'fail_cancel'
    })
  }
}
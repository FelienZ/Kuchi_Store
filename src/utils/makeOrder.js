export default async function MakeOrder({id, dispatch}){
  try {
    const response = await fetch('http://localhost:3000/api/orders/makeorder', {
      method: 'POST',
      body:id,
      headers: {'Content-Type': 'text/plain'},
      credentials:'include'
    })
    await response.json()
    if(response.ok){
      dispatch({
        type: 'SET_STATUS',
        status: 'success_order'
      })
    }else{
      dispatch({
        type: 'SET_STATUS',
        status: 'fail_order'
      })
    }
  } catch (error) {
    console.error(`[PostCheckout]: ${error.message}`)
  }
}
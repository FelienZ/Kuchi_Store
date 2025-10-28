export default async function MakeOrder({user, dispatch, orderData}){
  if(!user){
    return dispatch({
      type: 'SET_STATUS',
      status:'not_loggedin',
    })
  }
  if(orderData.qty <= 0){
    return dispatch({
      type: 'SET_STATUS',
      status:'fail_order',
    })
  }
  try {
    const response = await fetch('http://localhost:3000/api/orders/makeorder', {
      method: 'POST',
      body:JSON.stringify(orderData),
      headers: {'Content-Type': 'application/json'},
      credentials:'include'
    })
    const result = await response.json()
    if(response.ok){
      // console.log('berhasil order')
      dispatch({
        type: 'SET_STATUS',
        status: 'success_order'
      })
    }else{
      dispatch({
        type: 'SET_STATUS',
        status: 'fail_order',
        message: result.message
      })
    }
  } catch (error) {
    console.error(`[PostCheckout]: ${error.message}`)
  }
}
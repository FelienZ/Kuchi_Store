export default async function getProducts({dispatch}) {
  try {
    const response = await fetch('http://localhost:3000/api/products')
    const result = await response.json();
    if(result.type === 'success'){
      dispatch({
        type: 'GET_DATA',
        payload: result.payload
      })
      return
    }else{
      dispatch({
        type: 'SET_STATUS',
        status: 'fetch_fail'
      })
    }
  } catch (error) {
    console.error(`Terjadi Kesalahan dalam Load: ${error.message}`)
  }
}
export default async function GetWishlist({setWishlist, setIsLoading}){
  setIsLoading?.(true)
  try {
    const response = await fetch('http://localhost:3000/api/products/getwishlist', {
      credentials: 'include'
    })
    const result = await response.json()
    const data = result.data
    if(response.ok){
      setWishlist(data)
    }
  } catch (error) {
    console.error(`Gagal Mendapatkan Wishlist: ${error.message}`)
  }finally{
    setIsLoading?.(false)
  }
}

const baseUrl = import.meta.env.VITE_API_URL

export default async function GetWishlist({setWishlist, setIsLoading}){
  setIsLoading?.(true)
  try {
    const response = await fetch(`${baseUrl}/api/wishlists/getwishlist`, {
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

import { useContext, useEffect, useState } from "react"
import { ProductList } from "../../../storeContext"
import ProductCard from "../Productlist/ProductCard";

export default function WishlistItem(){
  const product = useContext(ProductList);
  const [wishlist, setWishlist] = useState([])
  useEffect(()=> {
    async function getWishlist() {
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
      }
    }
    getWishlist()
  }, [])
  const matchData = wishlist.map(i =>{
    const findProduct = product.find(p => p.id === i.product_id)
    return findProduct
  })
  return(
        <section className="flex flex-col gap-4">
            <p className="font-bold">Your Wishlist</p>
            <div className="grid grid-cols-4 gap-2 p-3">
              {matchData.map(i=>(
                <ProductCard key={i.id} products={i}/>
              ))}
            </div>
        </section>
  )
}
import { useContext, useState } from "react"
import { ProductList } from "../../../storeContext"
import ProductCard from "../Productlist/ProductCard";
import useFetchWishlist from "../../../hooks/Effect/fetchWishlist";

export default function WishlistItem(){
  const product = useContext(ProductList);
  const [isLoading, setIsLoading] = useState(false)
  const wishlist = useFetchWishlist({setIsLoading})
  const matchData = wishlist.map(i =>{
    const findProduct = product.find(p => p.id === i.product_id)
    return findProduct
  })
  return(
        <section className="flex flex-col gap-4 p-3">
            <p className="font-bold">YOUR WISHLIST</p>
            {!isLoading ? (
              <div className="grid min-[360px]:grid-cols-2 lg:grid-cols-4 gap-2 max-h-[50dvh] overflow-y-auto">
              {matchData.map(i=>(
                <ProductCard key={i.id} products={i}/>
              ))}
            </div>
            ): (
              <div className="self-center">
                <p>Loading...</p>
              </div>
            )}
        </section>
  )
}
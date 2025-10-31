import { useState } from "react"
import { ProductList } from "../../../storeContext"
import ProductCard from "../Productlist/ProductCard";
import useFetchWishlist from "../../../hooks/fetchWishlist";

export default function WishlistItem(){
  const [isLoading, setIsLoading] = useState(false)
  const [wishlist] = useFetchWishlist({setIsLoading})
  // console.log('cek wishlist: ', wishlist)
  return(
        <section className="flex flex-col gap-4 p-3">
            <p className="font-bold">YOUR WISHLIST</p>
            {!isLoading ? (
              wishlist?.length > 0 ? (
                <div className="grid min-[360px]:grid-cols-2 lg:grid-cols-4 gap-2 max-h-[50dvh] overflow-y-auto">
                  {wishlist.map(w=>(
                    <ProductCard key={w.id} products={w.product}/>
                  ))}
                </div>
              ) : (
                <div className="place-content-center place-items-center h-[50dvh]">
                <p>Wishlist Sedang Kosong</p>
              </div>
              )
            ): (
              <div className="place-content-center place-items-center h-[50dvh]">
                <p>Loading...</p>
              </div>
            )}
        </section>
  )
}
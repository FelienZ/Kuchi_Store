import { useEffect, useState } from "react";
import getWishlist from "../../utils/getWishlist";

export default function useFetchWishlist({setIsLoading}){
  const [wishlist, setWishlist] = useState([])
  useEffect(()=> {
    getWishlist({setWishlist, setIsLoading})
  }, [])
  return wishlist
}
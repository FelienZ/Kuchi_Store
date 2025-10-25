import { useCallback, useEffect, useState } from "react";
import GetWishlist from "../../utils/getWishlist";

export default function useFetchWishlist({setIsLoading}){
  const [wishlist, setWishlist] = useState([])

  const fetchWishlist = useCallback(()=> {
    GetWishlist({setWishlist, setIsLoading})
  }, [setWishlist, setIsLoading])

  useEffect(()=> {
    fetchWishlist()
  }, [fetchWishlist])

  return [wishlist, fetchWishlist]
}
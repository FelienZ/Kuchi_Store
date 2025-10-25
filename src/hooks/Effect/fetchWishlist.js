import { useEffect, useState } from "react";
import getWishlist from "../../utils/getWishlist";

export default function useFetchWishlist(){
  const [wishlist, setWishlist] = useState([])
  useEffect(()=> {
    getWishlist({setWishlist})
  }, [])
  return wishlist
}
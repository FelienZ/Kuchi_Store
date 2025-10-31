import { useCallback, useEffect } from "react";
import getProducts from "../utils/getProducts";

export default function useFetchProducts({dispatch, setIsLoading}){
  const fetchProduct = useCallback(()=>{
    getProducts({dispatch, setIsLoading})
  }, [dispatch, setIsLoading])

  useEffect(()=> {
    fetchProduct()
  },[fetchProduct])

  return fetchProduct
}
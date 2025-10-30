import { useCallback, useEffect, useState } from "react";
import GetOrder from "../utils/getOrder";

export default function useFetchOrder({setIsLoading}){
  const [order, setOrder] = useState([])

  const fetchOrder = useCallback(()=> {
    GetOrder({setIsLoading, setOrder})
  }, [setOrder, setIsLoading])

  useEffect(()=> {
    fetchOrder()
  }, [fetchOrder])

  return [order, fetchOrder]
}
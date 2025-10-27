import { useEffect } from "react";
import getProducts from "../utils/getProducts";

export default function useFetchProducts({dispatch}){
  useEffect(()=> {
    getProducts({dispatch})
  },[dispatch])
}
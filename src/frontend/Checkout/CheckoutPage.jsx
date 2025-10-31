import { faMinus, faPlus, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import useFetchOrder from "../../hooks/fetchOrder";
import { ProductReducerContext } from "../../storeContext";
import CancelOrder from "../../utils/cancelOrder";

export default function CheckoutPage(){
  const [isLoading, setIsLoading] = useState(false)
  const [order, fetchOrder] = useFetchOrder({setIsLoading})
  const dispatch = useContext(ProductReducerContext)
  const [orderData, setOrderData] = useState(null)
  useEffect(()=> {
    setOrderData([...order])
  }, [order])
  function handleChangeQuantity(orderId, change){
    setOrderData(prev => 
      prev.map(i =>{ 
        if(i.id !== orderId) return i
        let newQty = i.qty + change
        newQty = Math.max(1, Math.min(newQty, i.product.stock + 1))
        return {...i, qty: newQty, total_price: newQty*i.product.price}
      }
      )
    )
  }
  function handleCancelOrder(id){
    CancelOrder({id, fetchOrder, dispatch})
  }
  return(
    isLoading ? (<section className="min-h-screen grid place-content-center">
                <span className="loading loading-bars loading-xl text-lime-500"></span>
            </section>) : (
              <div className="flex flex-col place-self-center gap-5 text-neutral/50 w-[90%] h-screen overflow-y-auto mt-15 bg-white drop-shadow-sm rounded-md p-5">
                <p className="font-bold text-2xl flex items-center gap-3 pb-2 text-neutral"> <FontAwesomeIcon icon={faShoppingCart}/> Your Shopping Cart</p>
                {orderData?.length > 0 ? (<div className="grid gap-5">
                  {orderData?.map(i=>(
                    <div key={i.id} className="flex max-xl:grid min-sm:grid-cols-[auto_auto] border place-items-center gap-3 w-full bg-white drop-shadow-sm items-center rounded-md p-4">
                      <div className="p-3 border border-gray-300 rounded-md max-sm:place-self-center">
                        <img src={i.product.url} className="size-15 max-xl:size-30"/>
                      </div>
                      <div className="detail max-xl:flex grid grid-cols-6 items-center justify-around w-full max-[400px]:text-xs max-xl:flex-col max-xl:gap-4 max-lg:p-5">
                        <div className="name flex lg:flex-col items-center gap-3 max-xl:w-full justify-center">
                        <p className="font-bold text-neutral">{i.product.shortname??i.product.name}</p>
                        <p className="max-lg:hidden">{i.product.type}</p>
                      </div>
                      <div className="name flex lg:flex-col items-center gap-3 max-xl:w-full justify-center">
                        <p>Status Pemesanan:</p>
                        <p className={`badge badge-outline ${i.status.trim()==='done' ? 'badge-success' : 'badge-error'}`}>{i.status}</p>
                      </div>
                      <div className="name flex lg:flex-col items-center gap-3 max-xl:w-full justify-center">
                        <p>Harga:</p>
                        <p className="font-bold text-lime-500">{i.product.price.toLocaleString('id-ID',{style:'currency', currency: 'IDR'})}</p>
                      </div>
                      <div className="name flex lg:flex-col items-center gap-3 max-xl:w-full justify-center">
                        <p>Jumlah Pemesanan:</p>
                        <div className="flex items-center gap-2">
                          <button onClick={()=> handleChangeQuantity(i.id, -1)} className="btn btn-neutral size-8"><FontAwesomeIcon icon={faMinus}/></button>
                          <p className="font-bold text-lime-500">{i.qty}</p>
                          <button onClick={()=> handleChangeQuantity(i.id, 1)} className="btn btn-neutral size-8"><FontAwesomeIcon icon={faPlus}/></button>
                        </div>
                      </div>
                      <div className="name flex lg:flex-col items-center gap-3 max-xl:w-full justify-center">
                        <p>Total Harga:</p>
                        <p className="font-bold text-lime-500">{i.total_price.toLocaleString('id-ID',{style:'currency', currency: 'IDR'})}</p>
                      </div>
                      <div className="flex max-xl:w-full justify-center">
                        <button onClick={()=>handleCancelOrder(i.id)} className="btn btn-neutral btn-outline rounded-full max-md:w-full w-[60%]">Cancel</button>
                      </div>
                      </div>
                    </div>
                  ))}
                </div>): (
                <div className="flex h-full justify-center items-center">
                  <p>Pesanan Sedang Kosong</p>
                </div>)}
              </div>
    )
  )
}
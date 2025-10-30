import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import useFetchOrder from "../../hooks/fetchOrder";

export default function CheckoutPage(){
  const [isLoading, setIsLoading] = useState(false)
  const [order] = useFetchOrder({setIsLoading})
  console.log('cek order:', order)
  return(
    isLoading ? (<section className="min-h-screen grid place-content-center">
                <span className="loading loading-bars loading-xl text-lime-500"></span>
            </section>) : (
              <div className="flex flex-col place-self-center gap-5 text-neutral/50 w-[90%] mt-15 bg-white drop-shadow-sm rounded-md p-5">
                <p className="font-bold text-2xl flex items-center gap-3 pb-2 text-neutral"> <FontAwesomeIcon icon={faShoppingCart}/> Your Shopping Cart</p>
                <div className="grid gap-5">
                  {order.map(i=>(
                    <div key={i.id} className="flex bg-white drop-shadow-sm items-center rounded-md p-4 justify-between">
                      <div className="p-3 border border-gray-300 rounded-md">
                        <img src={i.product.url} className="size-15"/>
                      </div>
                      <div className="name flex flex-col items-center gap-3">
                        <p className="font-bold text-neutral">{i.product.shortname??i.product.name}</p>
                        <p>{i.product.type}</p>
                      </div>
                      <div className="name flex flex-col items-center gap-3">
                        <p>Harga</p>
                        <p className="font-bold text-lime-500">{i.product.price.toLocaleString('id-ID',{style:'currency', currency: 'IDR'})}</p>
                      </div>
                      <div className="name flex flex-col items-center gap-3">
                        <p>Jumlah Pemesanan</p>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-lime-500">{i.qty}</p>
                        </div>
                      </div>
                      <div className="name flex flex-col items-center gap-3">
                        <p>Total Harga</p>
                        <p className="font-bold text-lime-500">{i.total_price.toLocaleString('id-ID',{style:'currency', currency: 'IDR'})}</p>
                      </div>
                      <button className="btn btn-neutral btn-outline rounded-full">Cancel</button>
                    </div>
                  ))}
                </div>
              </div>
    )
  )
}
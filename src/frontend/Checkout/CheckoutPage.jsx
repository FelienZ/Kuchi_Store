import { faMinus, faPlus, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import useFetchOrder from "../../hooks/fetchOrder";

export default function CheckoutPage(){
  const [isLoading, setIsLoading] = useState(false)
  const [order] = useFetchOrder({setIsLoading})
  return(
    isLoading ? (<section className="min-h-screen grid place-content-center">
                <span className="loading loading-bars loading-xl text-lime-500"></span>
            </section>) : (
              <div className="flex flex-col place-self-center gap-5 text-neutral/50 w-[90%] mt-15 bg-white drop-shadow-sm rounded-md p-5">
                <p className="font-bold text-2xl flex items-center gap-3 pb-2 text-neutral"> <FontAwesomeIcon icon={faShoppingCart}/> Your Shopping Cart</p>
                <div className="grid gap-5">
                  {order.map(i=>(
                    <div key={i.id} className="flex max-lg:grid min-sm:grid-cols-[auto_auto] border place-items-center gap-3 w-full bg-white drop-shadow-sm items-center rounded-md p-4">
                      <div className="p-3 border border-gray-300 rounded-md max-sm:place-self-center">
                        <img src={i.product.url} className="size-15 max-lg:size-25"/>
                      </div>
                      <div className="detail flex items-center justify-around w-full max-[400px]:text-xs max-lg:flex-col max-lg:gap-4 max-lg:p-5">
                        <div className="name flex lg:flex-col items-center gap-3 max-lg:w-full justify-center">
                        <p className="font-bold text-neutral">{i.product.shortname??i.product.name}</p>
                        <p className="max-lg:hidden">{i.product.type}</p>
                      </div>
                      <div className="name flex lg:flex-col items-center gap-3 max-lg:w-full justify-center">
                        <p>Status Pemesanan:</p>
                        <p className={`badge badge-outline ${i.status.trim()==='done' ? 'badge-success' : 'badge-error'}`}>{i.status}</p>
                      </div>
                      <div className="name flex lg:flex-col items-center gap-3 max-lg:w-full justify-center">
                        <p>Harga:</p>
                        <p className="font-bold text-lime-500">{i.product.price.toLocaleString('id-ID',{style:'currency', currency: 'IDR'})}</p>
                      </div>
                      <div className="name flex lg:flex-col items-center gap-3 max-lg:w-full justify-center">
                        <p>Jumlah Pemesanan:</p>
                        <div className="flex items-center gap-2">
                          <button className="btn btn-neutral size-8"><FontAwesomeIcon icon={faMinus}/></button>
                          <p className="font-bold text-lime-500">{i.qty}</p>
                          <button className="btn btn-neutral size-8"><FontAwesomeIcon icon={faPlus}/></button>
                        </div>
                      </div>
                      <div className="name flex lg:flex-col items-center gap-3 max-lg:w-full justify-center">
                        <p>Total Harga:</p>
                        <p className="font-bold text-lime-500">{i.total_price.toLocaleString('id-ID',{style:'currency', currency: 'IDR'})}</p>
                      </div>
                      <button className="btn btn-neutral btn-outline rounded-full max-lg:w-full">Cancel</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
    )
  )
}
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import useFetchOrder from "../../hooks/fetchOrder";

export default function CheckoutPage(){
  const [isLoading, setIsLoading] = useState(false)
  const [order] = useFetchOrder({setIsLoading})
  // console.log('cek order: ', order)
  return(
    isLoading ? (<section className="min-h-screen grid place-content-center">
                <span className="loading loading-bars loading-xl text-lime-500"></span>
            </section>) : (<section className="min-h-screen text-neutral/60 grid md:grid-cols-[1fr_0.5fr] xl:grid-cols-[1fr_0.3fr] gap-4 md:p-5 p-2 md:w-[90%] w-full place-self-center mt-15">
            <div className="left bg-white drop-shadow-sm rounded-sm flex flex-col gap-4 p-4 divide-y-2">
              <p className="font-bold text-xl pb-5 max-lg:text-center">YOUR CART</p>
              <div className="overflow-x-auto">
                <table className="table">
                  <thead className="text-neutral text-center">
                    <tr>
                      <th>Image</th>
                      <th>Product Name</th>
                      <th>Status</th>
                      <th>Price</th>
                      <th>Total</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {order.map(i => (
                      <tr key={i.id}>
                        <td><img src={i.product.url} className="size-15"/></td>
                        <td className="flex justify-center"><p className="w-25">{i.product.name}</p></td>
                        <td>{i.status.trim().toLowerCase === 'done' ? (<div className="badge badge-outline badge-success">{i.status}</div>) : (<div className="badge badge-outline badge-error">{i.status}</div>)}</td>
                        <td>{i.product.price.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'})}</td>
                        <td className="flex flex-col">
                          <p>Jumlah: {i.qty}</p>
                          <p>Total Harga: {i.total_price.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'})}</p>
                        </td>
                        <td></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="right flex flex-col gap-4 divide-y-2 bg-neutral/5 drop-shadow-sm rounded-sm p-4 xl:p-8">
              <p className="font-bold text-xl pb-3">SUMMARY</p>
              <div className="flex flex-col gap-2">
                <p className="text-sm">Enter a Coupon</p>
                <div className="flex items-center gap-2 pb-3">
                  <input type="text" className="input bg-transparent border border-neutral rounded-xs"/>
                  <button className="btn btn-neutral rounded-xs"><FontAwesomeIcon icon={faCheck}/></button>
                </div>
              </div>
              <div className="overflow-x-auto pb-3">
                  <table className="table">
                    <tbody>
                      <tr>
                        <td className="font-bold">SUBTOTAL</td>
                        <td className="font-bold">Rp. xxx</td>
                      </tr>
                      <tr>
                        <td>Shipping</td>
                        <td>Rp. xxx</td>
                      </tr>
                      <tr>
                        <td>Tax</td>
                        <td>Rp. xxx</td>
                      </tr>
                    </tbody>
                  </table>
              </div>
              <div className="flex items-center justify-between font-bold pb-3 text-sm">
                <p>ESTIMATED TOTAL</p>
                <p>Rp. xxx</p>
              </div>
              <button className="btn btn-neutral">Checkout</button>
            </div>
        </section>)
  )
}
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { ProductList } from "../../storeContext";

export default function Pinned(){
    const products = useContext(ProductList)
    const limit = {
        min: 1,
        max:4
    }
    const [show, setShow] = useState(limit)
    const filteredProduct = products.filter(i => i.id >= show.min && i.id <= show.max)
    const isPrevDisabled = show.min < 2
    const isNextDisabled = show.max >= products.length
    console.log('cek: ', filteredProduct)
    return(
        <section className="flex w-full gap-3 flex-col">
            <div className="top flex justify-between items-center">
                <p className="font-black text-nowrap text-xl">New Product</p>
                <div className="navi flex items-center gap-3">
                    <p className="text-nowrap">Lihat Semua</p>
                    |
                    <div className="buttons flex items-center gap-3">
                        <button disabled={isPrevDisabled} onClick={()=> setShow({...show, max: show.max - 1, min: show.min -1})} className="btn disabled:opacity-50 disabled:cursor-not-allowed btn-neutral size-10"><FontAwesomeIcon icon={faAngleLeft}/></button>
                        <button disabled={isNextDisabled} onClick={()=> setShow({...show, max: show.max + 1, min:show.min +1})} className="btn btn-neutral size-10"><FontAwesomeIcon icon={faAngleRight}/></button>
                    </div>
                </div>
            </div>
            <div className="down grid grid-cols-4 gap-3">
                {filteredProduct.map(i=> 
                        <div key={i.id} className="flex bg-neutral-300 items-center p-5 border flex-col gap-2">
                        <div className="image">
                            <img src={i.url} className="size-20"/>
                        </div>
                        <p>{i.name}</p>
                        <p className="font-bold">{i.price.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'})}</p>
                        <button className="btn btn-neutral w-full">Check It Now</button>
                    </div>
                )}

            </div>
        </section>
    )
}
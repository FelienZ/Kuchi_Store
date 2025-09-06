import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Pinned({title, item}){
    const limit = {
        min: 1,
        max:4
    }
    const [show, setShow] = useState(limit)
    
    const filterNewProducts = item.filter((i,idx) => idx + 1 >= show.min && idx + 1 <= show.max)
    const isNewPrevDisabled = show.min < 2
    const isNewNextDisabled = show.max >= item.length
    return(
        <section className="flex w-full gap-3 flex-col">
            <div className="top flex justify-between items-center">
                <p className="font-black text-nowrap text-xl">{title}</p>
                <div className="navi flex items-center gap-3">
                    <p className="text-nowrap hover:cursor-pointer">Lihat Semua</p>
                    |
                    <div className="buttons flex items-center gap-3">
                        <button disabled={isNewPrevDisabled} onClick={()=> setShow({...show, max: show.max - 1, min: show.min -1})} className="btn btn-neutral size-10"><FontAwesomeIcon icon={faAngleLeft}/></button>
                        <button disabled={isNewNextDisabled} onClick={()=> setShow({...show, max: show.max + 1, min:show.min +1})} className="btn btn-neutral size-10"><FontAwesomeIcon icon={faAngleRight}/></button>
                    </div>
                </div>
            </div>
            <div className="down grid grid-cols-4 gap-3">
                {filterNewProducts.map(i=> 
                        <div key={i.id} className="flex bg-neutral-300 items-center p-5 border flex-col gap-2">
                        <div className="image">
                            <img src={i.url} className="size-40"/>
                        </div>
                        <p className="h-12 text-center flex items-center">{i.name}</p>
                        <p className="font-bold">{i.price.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'})}</p>
                        <button className="btn btn-neutral w-full">Check It Out</button>
                    </div>
                )}

            </div>
        </section>
    )
}
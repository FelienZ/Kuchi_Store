import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Pinned({title, item, triggerInfo}){
    const limit = {
        min: 1,
        max:4
    }
    const [show, setShow] = useState(limit)
    const filterNewProducts = item.filter((i,idx) => idx + 1 >= show.min && idx + 1 <= show.max)
    const isPrevDisabled = show.min < 2
    const isNextDisabled = show.max >= item.length
    return(
        <section className="flex w-full max-sm:text-sm gap-3 flex-col">
            <div className="top flex justify-between items-center">
                <p className="font-black text-nowrap lg:text-2xl md:text-xl">{title}</p>
                <div className="navi flex items-center gap-3">
                    <p className="text-nowrap hover:cursor-pointer">Lihat Semua</p>
                    <p className={`${isNextDisabled && isPrevDisabled ? 'hidden' : 'flex'}`}> | </p>
                    <div className={`buttons ${isNextDisabled && isPrevDisabled ? 'hidden' : 'flex'} items-center gap-3`}>
                        <button disabled={isPrevDisabled} onClick={()=> setShow({...show, max: show.max - 1, min: show.min -1})} className={`btn btn-neutral size-10 ${isPrevDisabled ? 'hidden' : 'flex'}`}><FontAwesomeIcon icon={faAngleLeft}/></button>
                        <button disabled={isNextDisabled} onClick={()=> setShow({...show, max: show.max + 1, min:show.min +1})} className={`btn btn-neutral size-10 ${isNextDisabled ? 'hidden' : 'flex'}`}><FontAwesomeIcon icon={faAngleRight}/></button>
                    </div>
                </div>
            </div>
            <div className="down grid grid-cols-2 md:grid-cols-4 gap-3">
                {filterNewProducts.map(i=> 
                        <div key={i.id} className="flex bg-neutral-300 items-center p-5 border flex-col gap-2">
                        <div className="image">
                            <img src={i.url} className="max-sm:size-30 size-40"/>
                        </div>
                        <p className="h-12 text-center flex items-center">{i.name}</p>
                        <p className="font-bold">{i.price.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'})}</p>
                        <button onClick={()=>triggerInfo(i.id)} className="btn btn-neutral w-full text-nowrap">Check</button>
                    </div>
                )}

            </div>
        </section>
    )
}
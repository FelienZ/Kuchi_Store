import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CheckWindowWidth from "../../checkWindow";

export default function Pinned({title, item, stats}){
    const navigate = useNavigate()
    const width = CheckWindowWidth();
    const itemsLimit = width < 768 ? 2 : 4;
    const [show, setShow] = useState({min: 1, max: itemsLimit})

    useEffect(()=> {
        setShow({min: 1, max:itemsLimit})
    }, [itemsLimit])

    function checkStatus(status){
        switch(status){
            case "new":
                navigate('/products?status=_new')
                break;
            case "popular":
                navigate('/products?status=popular')
                break;
            case "recommended":
                navigate('/products?status=popular')
                break;
        }
    }
    const filterNewProducts = item.filter((i,idx) => idx + 1 >= show.min && idx + 1 <= show.max)
    const isPrevDisabled = show.min < 2
    const isNextDisabled = show.max >= item.length
    return(
        <section className="flex w-full max-sm:text-sm gap-3 flex-col">
            <div className="top flex justify-between items-center">
                <p className="font-black text-nowrap lg:text-2xl md:text-xl">{title}</p>
                <div className="navi flex items-center max-sm:gap-1 gap-3">
                    <p className="hover:underline hover:underline-offset-4 hover:cursor-pointer" onClick={()=>checkStatus(stats)}>Lihat Semua</p>
                    <p className={`${isNextDisabled && isPrevDisabled ? 'hidden' : 'flex'}`}> | </p>
                    <div className={`buttons ${isNextDisabled && isPrevDisabled ? 'opacity-50 cursor-not-allowed flex' : 'flex'} items-center max-sm:gap-1 gap-3`}>
                        <button disabled={isPrevDisabled} onClick={()=> setShow({...show, max: show.max - 1, min: show.min -1})} className={`btn btn-neutral size-10 ${isPrevDisabled ? 'opacity-40  text-neutral cursor-not-allowed border border-neutral' : 'flex'}`}><FontAwesomeIcon icon={faAngleLeft}/></button>
                        <button disabled={isNextDisabled} onClick={()=> setShow({...show, max: show.max + 1, min:show.min +1})} className={`btn btn-neutral size-10 ${isNextDisabled ? 'opacity-40 text-neutral cursor-not-allowed border border-neutral' : 'flex'}`}><FontAwesomeIcon icon={faAngleRight}/></button>
                    </div>
                </div>
            </div>
            <div className={` down grid ${item.length ? ('grid-cols-2 md:grid-cols-4 gap-3') : 'place-content-center'} `}>
                {item.length ? (filterNewProducts.map(i=> 
                        <div key={i.id} className="flex items-center p-3 border-neutral rounded-sm border flex-col gap-2">
                        <div className="image">
                            <img src={i.url} className="max-lg:size-30 size-40"/>
                        </div>
                        <p className="h-20 lg:w-[90%] text-center flex items-center justify-center">{i.name}</p>
                        <p className="font-bold text-neutral-800">{i.price.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'})}</p>
                        <button onClick={()=> navigate(`/products/${i.id}`)} className="btn max-md:px-3 btn-neutral w-full text-nowrap">Check</button>
                    </div>
                )): (
                    <div>
                        <span className="loading loading-ring text-lime-500 loading-md"></span>
                        <span className="loading loading-ring text-lime-500 loading-md"></span>
                        <span className="loading loading-ring text-lime-500 loading-md"></span>
                    </div>
                )}

            </div>
        </section>
    )
}
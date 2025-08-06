import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function CheckOutCard({checkoutItems = []}){
    if(checkoutItems.length > 0){
        return(
            <section className="flex flex-col gap-3 mt-5 w-[80%]">
                <p  className="font-bold text-xl"><FontAwesomeIcon icon={faCartShopping}/> Pesanan Anda</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {checkoutItems.map(item => (
                        <div className="items border border-neutral rounded-sm p-3 flex flex-col items-center">
                            <div className="image">
                                <img src={item.url} alt={`pic-${item.id}`} className="size-40 rounded-md"/>
                            </div>
                            <div className="item-content flex items-center flex-col gap-2 h-20">
                                <p className="h-12 font-bold md:text-lg text-center">{item.name}</p>
                                <p>{item.price.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'})}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            
        )
    }else{
        return(
            <section className="flex flex-col mt-5 w-[80%] gap-3">
                <p className="font-bold text-xl"><FontAwesomeIcon icon={faCartShopping}/> Pesanan Anda</p>
                <p>Pesanan Anda Masih Kosong</p>
            </section>
        )
    }
}
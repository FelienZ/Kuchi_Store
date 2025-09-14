import { useContext, useState } from "react"
import { useParams } from "react-router"
import { ProductList } from "../../storeContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMinus, faPlus, faShoppingCart } from "@fortawesome/free-solid-svg-icons"

export default function ProductDetail(){
    const { id } = useParams()
    const product = useContext(ProductList)
    const matchProduct = product.find(i => i.id === id)
    const mapData = []
    if(matchProduct){
    const data = matchProduct.specifications
    for( let key in data){
        mapData.push({key, data: data[key]})
    }
    }
    const [order, setOrder] = useState(0);
    return (
        mapData.length? (<section className="min-h-screen grid md:mt-20 md:w-[80%] place-self-center gap-2 md:grid-cols-2 p-3">
            <div className="left max-md:order-2 p-3 flex w-full flex-col gap-5">
                {/* Image Kalau > md */}
                <div className="image max-md:hidden">
                    <img src={matchProduct.url} alt={`gambar-${matchProduct.name}`}  className="size-90 max-sm:size-50 p-3 border border-gray-400"/>
                </div>
                <div className="content flex flex-col gap-3">
                    <p className="font-bold text-xl">Detail Produk</p>
                    <div className="flex flex-col">
                        <div className="point">
                            <p className="font-bold">Spesifikasi</p>
                        </div>
                        <div className="detail h-full flex gap-4 flex-col">
                        {mapData.map((i, idx) => (
                            <div key={idx} className="description grid p-2 grid-cols-2">
                                <p className="font-bold text-sm">{i.key.toUpperCase()}</p>
                                <p className="text-wrap overflow-x-auto">{i.data}</p>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="right relative p-3">
                <div className="divide-y max-md:order-1 flex flex-col gap-4 p-3 top-[128px]">
                    {/* Image Kalau < md */}
                    <div className="image max-md:flex justify-center hidden p-2">
                        <img src={matchProduct.url} alt={`gambar-${matchProduct.name}`}  className="size-90 mb-5 max-sm:size-70 p-3 self-center border border-gray-400"/>
                    </div>
                    <div className="items flex flex-col gap-3">
                        <p className="font-black md:text-2xl">{matchProduct.name.toUpperCase()}</p>
                        <p className="font-bold md:text-xl text-lime-500">{matchProduct.price.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'})}</p>
                    </div>
                    <div className="items-detail text-sm flex flex-col gap-3">
                        <p>Kategori: {matchProduct.type}</p>
                        <p>Brand: {matchProduct.specifications.brand}</p>
                        <p>Stok: {matchProduct.stock}</p>
                    </div>
                    <div className="checkout flex flex-col gap-3">
                        <div className="qty flex max-md:items-end flex-col gap-4">
                        <p>Qty: </p>
                        <div className="flex items-center gap-4">
                            <button onClick={()=>{order > 0 ? setOrder(order-1): order}} className="btn btn-neutral size-8"><FontAwesomeIcon icon={faMinus}/></button>
                                <p className="border border-neutral flex items-center justify-center size-8 rounded-sm">{order}</p>
                            <button onClick={()=>{order < matchProduct.stock ? setOrder(order+1): order}} className="btn btn-neutral size-8"><FontAwesomeIcon icon={faPlus}/></button>
                        </div>
                        <div className="buttons flex w-full gap-3 items-center">
                            <button className="btn btn-outline w-[50%]"><FontAwesomeIcon icon={faShoppingCart}/>Tambahkan</button>
                            <button className="btn btn-neutral w-[50%]">Beli Sekarang</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>) : (
            <section className="min-h-screen grid place-content-center">
                <span className="loading loading-bars loading-xl text-lime-500"></span>
            </section>
        )
    )
}
import { useContext } from "react"
import { useParams } from "react-router"
import { ProductList } from "../../storeContext"

export default function ProductDetail(){
    const { id } = useParams()
    const product = useContext(ProductList)
    const matchProduct = product.find(i => i.id === Number(id))
    const data = matchProduct.specifications
    const mapData = []
    for( let key in data){
        mapData.push({key, data: data[key]})
    }
    return (
        <section className="min-h-screen relative grid border border-neutral mt-20 w-[80%] place-self-center gap-2 lg:grid-cols-2 p-3">
            <div className="left border border-neutral p-3 flex w-full flex-col gap-3">
                <div className="image">
                    <img src={matchProduct.url} alt={`gambar-${matchProduct.name}`}  className="size-80 self-center border border-gray-400"/>
                </div>
                <div className="content flex flex-col gap-3">
                    <p className="font-bold text-xl">Detail Produk</p>
                    <div className="flex flex-col">
                        <div className="point">
                            <p className="font-bold text-sm">Spesifikasi</p>
                        </div>
                        <div className="detail border border-neutral h-full flex flex-col">
                        {mapData.map((i, idx) => (
                            <div key={idx} className="description grid p-4 grid-cols-2">
                                <p className="font-bold">{i.key}</p>
                                <p>{i.data}</p>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="right border border-neutral p-3 sticky">
                <p>Ini Sticky</p>
            </div>
        </section>
    )
}
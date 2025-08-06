import { brands } from "./Products/Brands";

export default function Brands(){
    return(
        <div className="overflow-hidden z-0 flex flex-col items-center text-base-300">
            <p className="text-lg font-bold">Our Brands</p>
        <div className="flex whitespace-nowrap animate-marquee gap-5  items-center text-lg px-4">
            {brands.map(item => (
                <div key={item.id}>
                    <img src={item.url} alt={`logo-${item.id}`} className="w-30"/>
                </div>
            ))}
        </div>
        </div>
    )
}
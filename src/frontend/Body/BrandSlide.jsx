import { brands } from "../Products/Brands";

export default function Brands(){
    return(
        <div className="overflow-hidden z-0 w-[80%] flex items-center text-base-300">
            {/* <p className="text-lg font-bold">Our Brands</p> */}
        <div className="flex whitespace-nowrap animate-marquee gap-5 md:gap-15 items-center text-lg px-4">
            {brands.map(item => (
                <div key={item.id}>
                    <img src={item.url} alt={`logo-${item.id}`} className="w-35"/>
                </div>
            ))}
        </div>
        </div>
    )
}
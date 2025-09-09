export default function About(){
    return(
        <section className="flex flex-col gap-4">
            <p className="font-bold">Overview</p>
            <p className="text-justify">KuchiStore adalah toko online elektronik yang berdedikasi untuk menyediakan produk-produk berkualitas tinggi dan inovatif untuk memenuhi kebutuhan Anda. Dengan pengalaman dan pengetahuan yang luas dalam industri elektronik, kami berkomitmen untuk memberikan pelayanan terbaik dan produk yang sesuai dengan keinginan Anda.</p>
            <ul className="flex flex-col gap-3">
                <p className="font-bold">Misi Kami</p>
                <li>Menyediakan produk elektronik berkualitas tinggi dengan harga kompetitif</li>
                <li>Memberikan pelayanan pelanggan yang ramah dan responsif</li>
                <li>Meningkatkan kepuasan pelanggan melalui produk dan layanan yang inovatif</li>    
            </ul>
            
        </section>
    )
}
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"

export default function Hero(){
    const items = [
        {
            id:1,
            title: 'Welcome to Kuchiha Store !',
            content: 'Toko Elektronik Digital Terbaik di Kota Palembang',
            addition: <button className="btn rounded-r-full text-xl glass text-white max-sm:self-center max-sm:rounded-full">Get Started</button>,
            picture: '/Hero/Headphone.png',
            background: 'bg-gradient-to-br from-neutral-600 via-zinc-500 to-neutral-700'
        },
        {
            id:2,
            title: 'Temukan Berbagai Promo Menarik!',
            content: 'Kami menyediakan berbagai promo menarik setiap Bulan',
            addition: <button className="btn rounded-r-full text-xl glass text-white max-sm:self-center max-sm:rounded-full">Check it Out!</button>,
            picture: '/Hero/Samsungs24U.png',
            background: 'bg-gradient-to-br from-blue-900 via coral-400 to-blue-200'
        }
    ]
    const [pages, setPages] = useState(1)
/*     const [slider, setSlider] = useState('right')
 */    const handlePrev = () =>{
/*         setSlider('left')
 */        setPages((prev)=> (prev - 1 + items.length) % items.length)
    }
    const handleNext = () =>{
/*         setSlider('right')
 */        setPages((prev)=> (prev + 1) % items.length)
    }
    useEffect(()=> {
        const interval = setInterval(() => {
/*             setSlider('right')
 */            setPages((prev)=> (prev + 1) % items.length)
        }, 5000);
        return ()=> clearInterval(interval)
    }, [pages])
    return(
        <div key={items[pages].id}
        className={`hero place-content-center w-screen glass min-h-screen transition-all duration-[1200] ${items[pages].background}`}
        >
        <div className="flex flex-col w-full items-center gap-10">
            <div className="hero-content w-full items-center relative max-sm:flex-col max-sm:gap-y-10 md:justify-between text-neutral-content text-center">
                <div className="control absolute flex w-full max-sm:hidden justify-between z-10">
                    <button onClick={handlePrev} className="btn rounded-full glass"><FontAwesomeIcon icon={faArrowLeft}/></button>
                    <button onClick={handleNext} className="btn rounded-full glass"><FontAwesomeIcon icon={faArrowRight}/></button>
                </div>
                <div className="content-text items-end max-sm:items-center max-sm:order-2 flex flex-col gap-5 p-5 w-[80%]">
                    <p className="font-black text-xl md:text-4xl glass text-nowrap font-[Outfit] bg- p-2 rounded-full sm:rounded-r-none md:self-end px-5">{items[pages].title}</p>
                    <p className="font-bold text-justify max-sm:text-center">{items[pages].content}</p>
                    {items[pages].addition}
                </div>
                <div className="image max-sm:order-1 max-sm:size-[60%] size-[30%] drop-shadow-md drop-shadow-white">
                    <img src={items[pages].picture}/>
                </div>
            </div>
            <div className="bottom text-white flex justify-center">
                <p className="font-bold">2025 © Kuchiha Store By FelienZ</p>
            </div>
        </div>
        </div>
    )
}
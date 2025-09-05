export default function Hero(){
    return(
        <div
        className="hero glass bg-gradient-to-br from-neutral-800 via-zinc-800 to-neutral-900 min-h-screen"
        >
        <div className="hero-overlay bg-transparent"></div>
        <div className="hero-content max-sm:flex-col max-sm:gap-20 md:justify-between justify-evenly w-full text-neutral-content text-center">
            <div className="content-text items-start max-sm:order-2 flex flex-col gap-5 p-5 max-sm:w-[70%] w-[50%]">
                <p className="font-black text-xl md:text-4xl glass font-[Outfit] bg- p-2 rounded-full md:rounded-r-none self-end">Welcome to Kuchi Store !</p>
                <p className="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis iure sed non fugiat veniam earum beatae vitae commodi magni modi?</p>
                <button className="btn glass text-white max-sm:self-end">Get Started</button>
            </div>
            <div className="image max-sm:order-1 max-sm:size-[60%] size-[30%] drop-shadow-md drop-shadow-white">
                <img src="public/Hero/Headphone.png"/>
            </div>
        </div>
        </div>
    )
}
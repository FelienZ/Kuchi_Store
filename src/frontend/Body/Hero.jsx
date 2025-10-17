import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { HeroItems } from "../../utils/heroItems.jsx"

export default function Hero(){
    const navigate = useNavigate()
    const items = HeroItems
    const [pages, setPages] = useState(1)
    const handlePrev = () =>{
         setPages((prev)=> (prev - 1 + items.length) % items.length)
    }
    const handleNext = () =>{
         setPages((prev)=> (prev + 1) % items.length)
    }
    useEffect(()=> {
        const interval = setInterval(() => {
            setPages((prev)=> (prev + 1) % items.length)
        }, 5000);
        return ()=> clearInterval(interval)
    }, [pages])
    return(
        <motion.div className={`hero place-content-center w-screen min-h-screen`}
         animate={{backgroundColor: items[pages].background, opacity: 1}}
         initial={{opacity: 0.5}}
         exit={{opacity: 0}}
         transition={{duration: 0.5}}
         >
            <div className="flex flex-col w-full items-center gap-10">
             <div className="hero-content w-full items-center relative max-sm:flex-col max-sm:gap-y-10 md:justify-between text-neutral-content text-center">
                 <div className="control absolute flex w-full max-sm:hidden justify-between z-10">
                     <button onClick={handlePrev} className="btn rounded-full glass"><FontAwesomeIcon icon={faArrowLeft}/></button>
                     <button onClick={handleNext} className="btn rounded-full glass"><FontAwesomeIcon icon={faArrowRight}/></button>
                 </div>
                 <div className="content-text items-end max-sm:items-center max-sm:order-2 flex flex-col gap-5 p-5 w-[80%]">
                     <motion.p 
                        initial={{ opacity: 0}}
                        key={items[pages].title}
                        src={items[pages].title}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0,}}
                        transition={{ duration: 0.7 }}
                     className="font-black text-xl md:text-4xl glass max-sm:text-lg text-nowrap  font-[Outfit] bg- p-2 rounded-full sm:rounded-r-none md:self-end px-5">
                        {items[pages].title}
                     </motion.p>
                     
                     <motion.p 
                        initial={{ opacity: 0}}
                        key={items[pages].content}
                        src={items[pages].content}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0,}}
                        transition={{ duration: 0.7 }}
                     className="font-bold text-justify max-sm:text-center md:text-lg">
                        {items[pages].content}
                     </motion.p>
                     <div onClick={()=> navigate('/products')}>
                         {items[pages].addition}
                     </div>
                 </div>
                 <div className="image max-sm:order-1 max-sm:size-[60%] size-[30%] drop-shadow-md drop-shadow-white">
                     <AnimatePresence mode="wait">
                        <motion.img
                        key={items[pages].picture}
                        src={items[pages].picture}
                        initial={{ x: -60, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 60, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        />
                     </AnimatePresence>
                 </div>
             </div>
             <div className="bottom text-white flex justify-center">
                 <p className="font-bold">2025 © Kuchiha Store By FelienZ</p>
             </div>
         </div>
        </motion.div>
    )
}
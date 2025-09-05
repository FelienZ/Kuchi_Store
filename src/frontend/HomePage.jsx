import Brands from "./Body/BrandSlide";
import Hero from "./Body/Hero";
import Pinned from "./Body/Pinned";

export default function HomePage(){
  return(
    <section className='h-full flex flex-col justify-between gap-15 items-center text-base-300 w-screen bg-white overflow-x-hidden'>
      <Hero/>
      <Brands/>
      <div className="items flex flex-col gap-20 w-[80%]">
        <Pinned/>
        <Pinned/>
        <Pinned/>
      </div>
    </section>
  )
}

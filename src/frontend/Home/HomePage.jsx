import { useContext } from "react";
import Brands from "../Body/BrandSlide";
import Hero from "../Body/Hero";
import Pinned from "../Body/Pinned";
import { ProductList } from "../../storeContext";

export default function HomePage(){
  const product = useContext(ProductList);
  const newProducts = product.filter(i => i.new === true);
  const popularProducts = product.filter(i=> i.popular === true);
  const recommended = product.filter(i=> i.recommended === true);
  return(
    <section className='h-full flex flex-col justify-between gap-15 items-center text-base-300 w-screen bg-white overflow-x-hidden'>
      <Hero/>
      <Brands/>
      <div className="items flex flex-col gap-20 w-[80%]">
        <Pinned title={"New Products"} item={newProducts}/>
        <Pinned title={"Popular Products"} item={popularProducts}/>
        <Pinned title={"Recommended For You"} item={recommended}/>
      </div>
    </section>
  )
}

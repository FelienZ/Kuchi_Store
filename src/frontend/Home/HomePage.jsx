import { useContext, useState } from "react";
import Brands from "../Body/BrandSlide";
import Hero from "../Body/Hero";
import { ProductList } from "../../storeContext";
import Pinned from "./Pinned";

export default function HomePage(){
  const product = useContext(ProductList);
  const newProducts = product.filter(i => i._new === true);
  const popularProducts = product.filter(i=> i.popular === true);
  const recommended = product.filter(i=> i.recommended === true);
    function showFormCheckout(id){
        const findProduct = product.find(i => i.id === id)
        setSelectItem(findProduct)
    }
  return(
    <section className='h-full flex flex-col justify-between gap-5 items-center text-base-300 w-screen bg-white overflow-x-hidden'>
      <Hero/>
      <Brands/>
      <div className="items flex flex-col gap-30 max-sm:w-full max-sm:px-3 w-[80%]">
        <Pinned title={"New Products"} item={newProducts} triggerInfo={showFormCheckout} stats='new'/>
        <hr className="text-gray-400"/>
        <Pinned title={"Popular Products"} item={popularProducts} triggerInfo={showFormCheckout} stats='popular'/>
        <hr className="text-gray-400"/>
        <Pinned title={"Recommended For You"} item={recommended} triggerInfo={showFormCheckout} stats='recommended'/>
      </div>
    </section>
  )
}

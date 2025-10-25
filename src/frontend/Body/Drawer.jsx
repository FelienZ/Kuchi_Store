import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { ProductReducerContext } from "../../storeContext";
import { updateQueryParams } from "../../utils/queryParams";
import TechnologiesLogo from "./Technologies";

export default function Drawer(){
  const price = {
    min: null,
    max: null
  }
  const dispatch = useContext(ProductReducerContext)
  const [filterPrice, setFilterPrice] = useState(price)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  function handleSendFilter(){
    if(filterPrice.min === null && filterPrice.max === null) dispatch({type: 'SET_STATUS', status: 'invalid_filter'})
    updateQueryParams(filterPrice, navigate, searchParams)
  }
  function handleSendCategories(category){
    updateQueryParams({category}, navigate, searchParams)
  }
  return(
        <div className="flex flex-col text-base-300 gap-3">
            <p className="font-bold">Filter Item</p>
            <div className="flex flex-col max-lg:hidden category border border-gray-500 p-4 rounded-sm gap-5">
                <p className="font-medium">Kategori</p>
                <div className="item-content flex flex-col gap-2 ">
                    <a onClick={()=> handleSendCategories('smartphone')} className="w-full flex justify-between hover:cursor-pointer items-center"><p>SmartPhone</p> <FontAwesomeIcon icon={faArrowRight}/></a>
                    <a onClick={()=> handleSendCategories('computer')} className="w-full flex justify-between hover:cursor-pointer items-center"><p>Laptop/PC</p> <FontAwesomeIcon icon={faArrowRight}/></a>
                    <a onClick={()=> handleSendCategories('accessories')} className="w-full flex justify-between hover:cursor-pointer items-center"><p>Aksesoris</p> <FontAwesomeIcon icon={faArrowRight}/></a>
                    <a onClick={()=> navigate('/products')} className="w-full flex items-center hover:cursor-pointer hover:underline underline-offset-4 hover:text-primary"><p className="text-primary font-medium">Lihat semua</p></a>
                </div>
            </div>

            <div className="flex flex-col max-lg:hidden category border border-gray-500 p-4 rounded-sm gap-5">
                <div className="head flex justify-between items-center">
                    <p className="font-medium">Harga</p>
                    <button className="btn btn-ghost" onClick={handleSendFilter}>Terapkan</button>
                </div>
                <div className="item-content flex flex-col gap-2 items-center">
                    <input type="number" onChange={(e)=>setFilterPrice({...filterPrice, min: Number(e.target.value)})} name="minPrice" id="hargaMin" placeholder="Minimal" className="input w-full input-neutral bg-transparent"/>
                    <input type="number" onChange={(e)=>setFilterPrice({...filterPrice, max: Number(e.target.value)})} name="maxPrice" id="hargaMax" placeholder="Maksimal" className="input w-full input-neutral bg-transparent"/>
                </div>
            </div>

            <div tabIndex={0} className="collapse lg:hidden collapse-arrow border-neutral rounded-none border">
                <div className="collapse-title font-semibold">Filter</div>
                <div className="collapse-content flex flex-col gap-3 text-sm">
                    <div className="flex flex-col category border border-gray-500 p-4 rounded-sm gap-5">
                        <p className="font-medium">Kategori</p>
                        <div className="flex flex-col gap-2 ">
                            <a onClick={()=> handleSendCategories('smartphone')} className="w-full flex justify-between hover:cursor-pointer items-center"><p>SmartPhone</p> <FontAwesomeIcon icon={faArrowRight}/></a>
                            <a onClick={()=> handleSendCategories('computer')} className="w-full flex justify-between hover:cursor-pointer items-center"><p>Laptop/PC</p> <FontAwesomeIcon icon={faArrowRight}/></a>
                            <a onClick={()=> handleSendCategories('accessories')} className="w-full flex justify-between hover:cursor-pointer items-center"><p>Aksesoris</p> <FontAwesomeIcon icon={faArrowRight}/></a>
                            <a onClick={()=> navigate('/products')} className="w-full flex items-center hover:cursor-pointer hover:underline underline-offset-4 hover:text-primary"><p className="text-primary font-medium">Lihat semua</p></a>
                        </div>
                    </div>
                    <div className="flex flex-col category border border-gray-500 p-4 rounded-sm gap-5">
                        <div className="head flex justify-between items-center">
                            <p className="font-medium">Harga</p>
                            <button className="btn btn-ghost" onClick={handleSendFilter}>Terapkan</button>
                        </div>
                        <div className="flex flex-col gap-2 items-center">
                            <input type="number" onChange={(e)=>setFilterPrice({...filterPrice, min: Number(e.target.value)})} name="minPrice" id="hargaMin" placeholder="Minimal" className="input w-full input-neutral bg-transparent"/>
                            <input type="number" onChange={(e)=>setFilterPrice({...filterPrice, max: Number(e.target.value)})} name="maxPrice" id="hargaMax" placeholder="Maksimal" className="input w-full input-neutral bg-transparent"/>
                        </div>
                    </div>  
                </div>
            </div>
            <TechnologiesLogo/>
        </div>
  )
}
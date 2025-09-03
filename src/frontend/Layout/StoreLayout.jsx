import { Outlet } from "react-router";
import Navigation from "../Body/Navigation";
import { useReducer } from "react";
import { product } from "../../Products/product";
import { ProductList, ProductReducerContext } from "../../storeContext";
import Footer from "../Body/Footer";

function StoreReducer(list, action){
    switch(action.type){
        case "SET_FILTER":
            return {...list, filter: {...list.filter, keyword: action.text}}
    }
}

export default function StoreLayout(){
    const [store, dispatch] = useReducer(StoreReducer, {
        product: product,
        filter: {
            min: 0,
            max: 0,
            keyword: ''
        },
        status: ''
    })
    console.log('tes: ', store)
    const filteredProduct = store.product.filter(i => i.name.trim().toLowerCase().includes(store.filter.keyword.trim().toLowerCase()))
    return(
        <div className ='min-h-screen flex flex-col justify-between gap-5 items-center text-base-300 w-screen bg-white overflow-x-hidden'>
            <ProductList.Provider value={filteredProduct}>
                <ProductReducerContext.Provider value={dispatch}>
                    <Navigation />
                    <div>
                        <Outlet/>
                    </div>
                    <Footer/>
                </ProductReducerContext.Provider>
            </ProductList.Provider>
        </div>
    )
}
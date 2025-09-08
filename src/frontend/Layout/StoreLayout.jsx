import { Outlet } from "react-router";
import Navigation from "../Body/Navigation";
import { useReducer, useState } from "react";
import { product } from "../Products/product";
import { ProductList, ProductReducerContext } from "../../storeContext";
import Footer from "../Body/Footer";
import Login from "../Form/LoginForm";
import Register from "../Form/RegisterForm";

function StoreReducer(list, action){
    switch(action.type){
        case "SET_STATUS":
            return {...list, }
        
    }
}

export default function StoreLayout(){
    const [store, dispatch] = useReducer(StoreReducer, {
        product: product,
        status: ''
    })
    // console.log('tes : ', store.filter)
    const [triggerRegister, setTriggerRegister] = useState(false)
    function handleTriggerFormRegister(){
        setTriggerRegister(true)
    }
    const [triggerLogin, setTriggerLogin] = useState(false)
    function handleTriggerFormLogin(){
        setTriggerLogin(true)
    }
    // console.log('tes: ', store)
    function handleSendCloseRegister(value){
        setTriggerRegister(value)
    }
    function handleSendCloseLogin(value){
        setTriggerLogin(value)
    }

    return(
        <div className ='min-h-screen font-[Roboto] flex flex-col justify-between gap-5 items-center text-base-300 w-screen bg-white overflow-x-hidden'>
            <ProductList.Provider value={product}>
                <ProductReducerContext.Provider value={dispatch}>
                    <Navigation sendTriggerRegister={handleTriggerFormRegister} sendTriggerLogin={handleTriggerFormLogin}/>
                    <Register istriggered={triggerRegister} sendClose={handleSendCloseRegister}/>
                    <Login istriggered={triggerLogin} sendClose={handleSendCloseLogin}/>
                    <div className="my-15 w-full">
                        <Outlet/>
                    </div>
                    <Footer/>
                </ProductReducerContext.Provider>
            </ProductList.Provider>
        </div>
    )
}
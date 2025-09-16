import { Outlet } from "react-router";
import Navigation from "../Body/Navigation";
import { useEffect, useReducer, useState } from "react";
import { ProductList, ProductReducerContext } from "../../storeContext";
import Footer from "../Body/Footer";
import Login from "../Form/LoginForm";
import Register from "../Form/RegisterForm";

function StoreReducer(list, action){
    switch(action.type){
        case "GET_DATA":
            return {...list, product: action.payload}
        case "SET_STATUS":
            return {...list, status: action.status }
        case "SET_USER":
            return {...list, user: action.data, status: action.status}
        case "RESET_STATUS":
            return {...list, status: ''}
    }
}

export default function StoreLayout(){
    const [store, dispatch] = useReducer(StoreReducer, {
        product: [],
        user: null,
        status: ''
    })
    useEffect(()=> {
        async function FetchData() {
            try {
                const response = await fetch('http://localhost:3000/api/products')
                const result = await response.json();
                if(result.type === 'success'){
                    dispatch({
                    type: 'GET_DATA',
                    payload: result.payload
                })
                return
                }
            } catch (error) {
                dispatch({
                    type: 'SET_STATUS',
                    status: 'fetch_fail'
                })
            }
        }
        FetchData()
    },[])
    // console.log('tes : ', store.filter)
    const [triggerRegister, setTriggerRegister] = useState(false)
    const [message, setMessage] = useState(null)
    function setAlert(value){
        setMessage(value)
        setTimeout(() => {
            setMessage(null)
        }, 1600);
    }
    useEffect(()=> {
        if(store.status.trim() === 'fetch_fail'){
            setAlert({text: 'Gagal Mendapatkan Data!', type: 'fail'})
        }
        if(store.status.trim() === 'invalid'){
            setAlert({text: 'Filter Tidak Valid!', type: 'fail'})
        }
        if(store.status.trim() === 'invalid_register'){
            setAlert({text: 'Gagal Registrasi, Data Tidak Valid!', type: 'fail'})
        }
        if(store.status.trim() === 'success_register'){
            setAlert({text: 'Berhasil Mendaftar!', type: 'success'})
        }
        if(store.status.trim() === 'invalid_login'){
            setAlert({text: 'Gagal Login, Data Tidak Valid!', type: 'fail'})
        }
        if(store.status.trim() === 'success_login'){
            setAlert({text: 'Berhasil Login!', type: 'success'})
        }
        if(store.status.trim() === 'unmatch_data'){
            setAlert({text: 'Password Tidak Cocok!', type: 'fail'})
        }
        if(store.status){
            dispatch({
                type: 'RESET_STATUS'
            })
        }
    }, [store.status])
    function handleTriggerFormRegister(){
        setTriggerRegister(true)
    }
    const [triggerLogin, setTriggerLogin] = useState(false)
    function handleTriggerFormLogin(){
        setTriggerLogin(true)
    }
    console.log('tes: ', store.user)
    function handleSendCloseRegister(value){
        setTriggerRegister(value)
    }
    function handleSendCloseLogin(value){
        setTriggerLogin(value)
    }


    return(
        <div className ='min-h-screen font-[Roboto] flex flex-col justify-between gap-5 items-center text-base-300 w-screen bg-white overflow-x-hidden'>
            <ProductList.Provider value={store.product}>
                <ProductReducerContext.Provider value={dispatch}>
                    <Navigation sendTriggerRegister={handleTriggerFormRegister} sendTriggerLogin={handleTriggerFormLogin}/>
                    <Register istriggered={triggerRegister} sendClose={handleSendCloseRegister}/>
                    <Login istriggered={triggerLogin} sendClose={handleSendCloseLogin}/>
                    <div className="my-15 w-full">
                        <Outlet/>
                        {message ? (
                        <div className={`${message.type.trim()==='fail' ? 'alert-error' : 'alert-success'} fixed inset-0 text-white z-40 alert place-self-end m-4`}>
                            {message.text}
                        </div>
                    ) : ''}
                    </div>
                    <Footer/>
                </ProductReducerContext.Provider>
            </ProductList.Provider>
        </div>
    )
}
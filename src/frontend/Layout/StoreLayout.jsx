import { Outlet } from "react-router";
import Navigation from "../Body/Navigation";
import { useEffect, useReducer, useState } from "react";
import { ProductList, ProductReducerContext, UserContext } from "../../storeContext";
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
        }, 2000);
    }

    useEffect(()=>{
        const getUser = localStorage.getItem('user_data')
        if(getUser){
        dispatch({
            type: 'SET_USER',
            data: JSON.parse(getUser),
            status: ''
        })
        }
    }, [])

    useEffect(()=> {
       switch(store.status.trim()){
            case "invalid_register":
                return setAlert({text: 'Filter Tidak Valid!', type: 'fail'});
            case "success_register":
                return setAlert({text: 'Berhasil Mendaftar!', type: 'success'});
            case "fetch_fail":
                return setAlert({text: 'Gagal Mendapatkan Data!', type: 'fail'});
            case "invalid_login":
                return setAlert({text: 'Gagal Login, Data Tidak Valid!', type: 'fail'});
            case "not_loggedin":
                return setAlert({text: 'Anda Belum Login!', type: 'fail'});
            case "success_login":
                return setAlert({text: 'Berhasil Login!', type: 'success'});
            case "success_logout":
                return setAlert({text: 'Berhasil Logout!', type: 'success'});
            case "unmatch_data":
                return setAlert({text: 'Data Tidak Valid!', type: 'fail'})
            case "invalid_filter":
                return setAlert({text: 'Filter Tidak Valid!', type: 'fail'})
       }
        store.status ? (dispatch({type: 'RESET_STATUS'})) : ''
    }, [store.status])
    function handleTriggerFormRegister(){
        setTriggerLogin(false)
        setTriggerRegister(true)
    }
    const [triggerLogin, setTriggerLogin] = useState(false)
    function handleTriggerFormLogin(){
        setTriggerRegister(false)
        setTriggerLogin(true)
    }
    // console.log('tes: ', store.user)
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
                    <UserContext.Provider value={store.user}>
                        <Navigation sendTriggerRegister={handleTriggerFormRegister} sendTriggerLogin={handleTriggerFormLogin}/>
                        <Register sendTriggerLogin={handleTriggerFormLogin} istriggered={triggerRegister} sendClose={handleSendCloseRegister}/>
                        <Login istriggered={triggerLogin} sendClose={handleSendCloseLogin} sendTriggerRegister={handleTriggerFormRegister}/>
                        <div className="my-15 w-full">
                            <Outlet/>
                            {message ? (
                            <div className={`${message.type.trim()==='fail' ? 'alert-error' : 'alert-success'} fixed inset-0 text-white z-40 alert place-self-end m-4`}>
                                {message.text}
                            </div>
                        ) : ''}
                    </div>
                    <Footer/>
                    </UserContext.Provider>
                </ProductReducerContext.Provider>
            </ProductList.Provider>
        </div>
    )
}
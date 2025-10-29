import { Outlet } from "react-router";
import Navigation from "../Body/Navigation";
import { useReducer, useState } from "react";
import { ModalContext, ProductList, ProductReducerContext, UserContext } from "../../storeContext";
import Footer from "../Body/Footer";
import Login from "../Form/LoginForm";
import Register from "../Form/RegisterForm";
import MessageAlert from "../../hooks/messageAlert";
import useFetchProducts from "../../hooks/fetchProducts";
import ConfirmationForm from "../Form/ConfirmForm";

function StoreReducer(list, action){
  switch(action.type){
    case "GET_DATA":
      return {...list, product: action.payload}
    case "SET_STATUS":
      return {...list, status: action.status, message: action.message??''}
    case "SET_USER":
      return {...list, user: action.data, status: action.status}
    case "RESET_STATUS":
      return {...list, status: ''}
  }
}

export default function StoreLayout(){
  const [store, dispatch] = useReducer(StoreReducer, {
    product: [],
    status: '',
    message: ''
  })
    
  const [triggerRegister, setTriggerRegister] = useState(false)
  const [message, setMessage] = useState(null)
  const [triggerLogin, setTriggerLogin] = useState(false)
  const [triggerConfirm, setTriggerConfirm] = useState(false)
  const [action, setAction] = useState(null)

  function setAlert(value){
    setMessage(value)
    setTimeout(() => {
      setMessage(null)
    }, 2000);
  }

  useFetchProducts({dispatch});
  MessageAlert({info: store, setAlert, dispatch})

  function handleTriggerFormRegister(){
    setTriggerLogin(false)
    setTriggerRegister(true)
  }
  function handleTriggerFormLogin(){
    setTriggerRegister(false)
    setTriggerLogin(true)
  }
  function handleSendCloseRegister(value){
    setTriggerRegister(value)
  }
  function handleSendCloseLogin(value){
    setTriggerLogin(value)
  }
  function handleSendCloseConfirm(value){
    setTriggerConfirm(value)
  }
  function handleSendAction(value){
    setTriggerConfirm(true)
    setAction(value)
  }
  return(
        <div className ='min-h-screen font-[Roboto] flex flex-col justify-between gap-5 items-center text-base-300 w-screen bg-white overflow-x-hidden'>
            <ModalContext.Provider value={{triggerLogin, setTriggerLogin}}>
                <ProductList.Provider value={store.product}>
                    <ProductReducerContext.Provider value={dispatch}>
                            <Navigation 
                              sendTriggerRegister={handleTriggerFormRegister} 
                              sendTriggerLogin={handleTriggerFormLogin}
                              sendTriggerConfirm={handleSendAction}
                            />
                            <Register 
                              sendTriggerLogin={handleTriggerFormLogin} 
                              istriggered={triggerRegister} 
                              sendClose={handleSendCloseRegister}
                            />
                            <Login 
                              istriggered={triggerLogin} 
                              sendClose={handleSendCloseLogin} 
                              sendTriggerRegister={handleTriggerFormRegister}
                            />
                            <ConfirmationForm sendClose={handleSendCloseConfirm} actionData={action} isTriggered={triggerConfirm} sendTriggerConfirm={()=>setTriggerConfirm(true)}/>
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
            </ModalContext.Provider>
        </div>
  )
}
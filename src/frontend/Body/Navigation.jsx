import { faArrowRightToBracket, faBars, faCartShopping, faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { Link, NavLink, useNavigate, useSearchParams } from "react-router";
import { updateQueryParams } from "../../queryParams";
import { ProductReducerContext, UserContext } from "../../storeContext";

export default function Navigation({sendTriggerRegister, sendTriggerLogin}){
    const [keyword, setKeyword] = useState('')
    const [searchParams] = useSearchParams()
    const navigate = useNavigate();
    const dispatch = useContext(ProductReducerContext)
    const isLogin = useContext(UserContext)
    function handleSendKeyword(){
        updateQueryParams({keyword}, navigate, searchParams)
    }
    function handleSendCategories(category){
        updateQueryParams({category}, navigate, searchParams)
    }
    function checkStatus(){
        const isLoggedIn = localStorage.getItem('access_token')
        isLoggedIn ? navigate('/profile') : dispatch({
            type: 'SET_STATUS',
            status:'not_loggedin'
        })
    }
    function handleLogout(){
        localStorage.removeItem('user_data')
        localStorage.removeItem('access_token')
        dispatch({
            type: 'SET_USER',
            data: null,
            status: 'success_logout'
        })
    }

    return(
    <header className="navbar fixed z-30 top-0 left-0 right-0 bg-neutral justify-evenly text-neutral-content w-full gap-2">
        <div className="left flex md:gap-5 gap-2 items-center text-nowrap w-fit">
            <Link to={'/'}><p className="font-bold font-[Outfit] text-lg max-sm:text-sm">Kuchiha Store</p></Link>
            <div className={` relative hamburger dropdown`}>
                <div tabIndex={0} role="button" className="btn bg-neutral m-1 p-3">
                    <FontAwesomeIcon icon={faBars} />
                </div>
                <ul tabIndex={0} className={`menu dropdown-content gap-2 bg-neutral rounded-box z-1 w-52 mt-3 p-5 shadow-sm`}>
                    <div className="flex gap-2">
                    <Link to={'/'}><li>Home</li></Link>
                    </div>
                <hr className="text-gray-400"/>
                {isLogin ? (
                    <li className="hover:cursor-pointer">View Profile</li>
                ): (
                <div className="flex gap-2">
                    <li className="hover:cursor-pointer" onClick={sendTriggerRegister}>Daftar</li>
                    <p>|</p>
                    <li className="hover:cursor-pointer" onClick={sendTriggerLogin}>Masuk</li>
                </div>
                )}
                <hr className="text-gray-400"/>
                <div className="flex gap-2">
                    <NavLink to={'/information/help'}><li>Bantuan</li></NavLink>
                    <p>|</p>
                    <Link to={'/checkout'}><li>Pemesanan</li></Link>
                </div>
                <hr className="text-gray-400"/>
                <li className="hover:cursor-pointer" onClick={()=> {handleSendCategories('smartphone')}}>SmartPhone</li>
                <hr className="text-gray-400"/>
                <li className="hover:cursor-pointer" onClick={()=> handleSendCategories('computer')}>Laptop/PC</li>
                <hr className="text-gray-400"/>
                <li className="hover:cursor-pointer" onClick={()=> handleSendCategories('accessories')}>Aksesoris</li>
            </ul>
            </div>
            <div className="searching flex items-center md:gap-3 gap-1 text-white">
                <input type="text" value={keyword} name="SearchInput" onChange={(e)=>setKeyword(e.target.value)} id="keywords" placeholder="Cari Barang" className="input border border-base-100 input-ghost w-full"/>
                <button onClick={handleSendKeyword}  className="magnifying btn btn-ghost hover:bg-neutral border border-base-100 max-sm:p-2">
                    <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
            </div>
        </div>
        <div className="right flex divide-x max-sm:hidden justify-between items-center text-nowrap w-fit">
            <Link className='pr-3' to={'/checkout'}><FontAwesomeIcon icon={faCartShopping}/></Link>
            {isLogin ? (
                <div className="flex items-center gap-3">
                    <div className="pl-3 avatar dropdown dropdown-center">
                    <div tabIndex={0} role="button" className="ring-gray-600 hover:cursor-pointer text-gray-600 place-items-center place-content-center bg-white ring-offset-base-100 size-8 rounded-full ring-2">
                        <p>{isLogin.username[0].toUpperCase()}</p>
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu bg-neutral rounded-box z-1 w-52 p-2 mt-13 shadow-sm">
                        <li onClick={()=>checkStatus()}><p className="flex items-center gap-4"><FontAwesomeIcon icon={faUser}/> {isLogin.username}</p></li>
                        <li onClick={handleLogout}><a className="flex items-center gap-4"><FontAwesomeIcon icon={faArrowRightToBracket}/> Logout</a></li>
                    </ul>
                    </div>
                </div>
            ) : (
            <div className="auth flex divide-x">
                <p className="hover:cursor-pointer px-3" onClick={sendTriggerRegister}>Daftar</p>
                <p className="hover:cursor-pointer pl-3" onClick={sendTriggerLogin}>Masuk</p>
            </div>
            )}
        </div>
    </header>
    )
}
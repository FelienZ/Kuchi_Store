import { faBars, faCartShopping, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, NavLink, useNavigate, useSearchParams } from "react-router";
import { updateQueryParams } from "../../queryParams";

export default function Navigation({sendTriggerRegister, sendTriggerLogin}){
    const [keyword, setKeyword] = useState('')
    const [searchParams] = useSearchParams()
    const navigate = useNavigate();

    function handleSendKeyword(){
        updateQueryParams({keyword}, navigate, searchParams)
    }
    function handleSendCategories(category){
        updateQueryParams({category}, navigate, searchParams)
    }
    
    return(
    <header className="navbar fixed z-30 top-0 left-0 right-0 bg-neutral justify-evenly text-neutral-content w-full gap-2">
        <div className="left flex md:gap-5 gap-2 items-center text-nowrap w-fit">
            <Link to={'/'}><p className="font-bold font-[Outfit] text-lg max-sm:text-sm">Kuchiha Store</p></Link>
            <details className={` relative hamburger dropdown`}>
                <summary role="button" className="btn bg-neutral m-1 p-3">
                    <FontAwesomeIcon icon={faBars} />
                </summary>
                <ul className={`menu dropdown-content gap-2 bg-neutral rounded-box z-1 w-52 mt-3 p-5 shadow-sm`}>
                    <div className="flex gap-2">
                    <Link to={'/'}><li>Home</li></Link>
                    </div>
                <hr className="text-gray-400"/>
                <div className="flex gap-2">
                    <li className="hover:cursor-pointer" onClick={sendTriggerRegister}>Daftar</li>
                    <p>|</p>
                    <li className="hover:cursor-pointer" onClick={sendTriggerLogin}>Masuk</li>
                </div>
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
            </details>
            <div className="searching flex items-center md:gap-3 gap-1 text-white">
                <input type="text" value={keyword} name="SearchInput" onChange={(e)=>setKeyword(e.target.value)} id="keywords" placeholder="Cari Barang" className="input border border-base-100 input-ghost w-full"/>
                <button onClick={handleSendKeyword}  className="magnifying btn btn-ghost hover:bg-neutral border border-base-100 max-sm:p-2">
                    <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
            </div>
        </div>
        <div className="right flex max-sm:hidden gap-5 items-center text-nowrap w-fit">
            <Link to={'/checkout'}><FontAwesomeIcon icon={faCartShopping}/></Link>
            <div className="auth flex gap-2">
               |  <p className="hover:cursor-pointer" onClick={sendTriggerRegister}>Daftar</p> |
                <p className="hover:cursor-pointer" onClick={sendTriggerLogin}>Masuk</p> |
            </div>
        </div>
    </header>
    )
}
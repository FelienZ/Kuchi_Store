import { faBars, faCartShopping, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Navigation(){
    return(
    <header className="navbar z-40 fixed top-0 left-0 right-0 bg-neutral justify-evenly text-neutral-content w-full gap-2">
        <div className="left flex md:gap-5 gap-2 items-center text-nowrap w-fit">
            <p className="font-bold text-lg max-sm:text-sm">Kuchiha Store</p>
            <div className="hamburger">
                <FontAwesomeIcon icon={faBars}/>
            </div>
            <div className="searching flex items-center md:gap-3 gap-1">
                <input type="text" name="SearchInput" id="keywords" placeholder="Cari Barang" className="input border border-base-100 input-ghost w-full"/>
                <button className="magnifying btn btn-ghost hover:bg-neutral border border-base-100 max-sm:p-2">
                    <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
            </div>
        </div>
        <div className="right flex gap-5 items-center text-nowrap w-fit">
            <FontAwesomeIcon icon={faCartShopping}/>
            <div className="auth flex gap-2 max-sm:hidden">
               |  <p>Daftar</p> |
                <p>Masuk</p> |
            </div>
        </div>
    </header>
    )
}
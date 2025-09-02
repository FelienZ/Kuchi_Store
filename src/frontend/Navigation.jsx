import { faBars, faCartShopping, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Navigation(){
    return(
    <header className="navbar fixed z-30 top-0 left-0 right-0 bg-neutral justify-evenly text-neutral-content w-full gap-2">
        <div className="left flex md:gap-5 gap-2 items-center text-nowrap w-fit">
            <p className="font-bold text-lg max-sm:text-sm">Kuchiha Store</p>
            <details className="hamburger dropdown">
                <summary className="btn bg-neutral m-1 p-2">
                    <FontAwesomeIcon icon={faBars} />
                </summary>
                <ul className="menu dropdown-content gap-2 bg-neutral rounded-box z-1 w-52 mt-3 p-5 shadow-sm">
                <div className="flex gap-2">
                    <li>Daftar</li>
                    <p>|</p>
                    <li>Masuk</li>
                </div>
                <hr className="text-gray-400"/>
                <div className="flex gap-2">
                    <li>Bantuan</li>
                    <p>|</p>
                    <li>Pemesanan</li>
                </div>
                <hr className="text-gray-400"/>
                <li>SmartPhone</li>
                <hr className="text-gray-400"/>
                <li>Laptop/PC</li>
                <hr className="text-gray-400"/>
                <li>Aksesoris</li>
            </ul>
            </details>
            <div className="searching flex items-center md:gap-3 gap-1 text-white">
                <input type="text" name="SearchInput" id="keywords" placeholder="Cari Barang" className="input border border-base-100 input-ghost w-full"/>
                <button className="magnifying btn btn-ghost hover:bg-neutral border border-base-100 max-sm:p-2">
                    <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
            </div>
        </div>
        <div className="right flex max-sm:hidden gap-5 items-center text-nowrap w-fit">
            <FontAwesomeIcon icon={faCartShopping}/>
            <div className="auth flex gap-2">
               |  <p>Daftar</p> |
                <p>Masuk</p> |
            </div>
        </div>
    </header>
    )
}